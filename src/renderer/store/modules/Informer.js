'use strict'

import _ from 'lodash'
import Vue from 'vue'
import { ipcRenderer } from 'electron'

const debug = require('debug')('kubist:store:informer')

const state = {
  objects: {},
  streams: {}
}

const getters = {
  queryResults: (state) => (id) => state.objects[id]
}

const mutations = {
  APPLY_DELTA (state, id, delta) {
    let objects = state.objects[id]
    if (!objects) {
      objects = Vue.set(state.objects, id, {})
    }

    const { type, object } = delta
    switch (type) {
      case 'Added': case 'Updated': case 'Sync':
        Vue.set(objects, object.metadata.name, object)
        break

      case 'Deleted':
        delete objects[object.metadata.name]
        break
    }
  },

  CLEAR_OBJECTS (state, id) {
    Vue.set(state.objects, id, {})
  },

  ADD_STREAM_LISTENERS (state, id, listeners) {
    if (state.streams[id]) return

    _.each(listeners, (fn, ev) => ipcRenderer.on(ev, fn))
    Vue.set(state.streams, id, listeners)
  },

  REMOVE_STREAM_LISTENERS (state, id) {
    const listeners = state.streams[id]
    if (!listeners) return

    _.each(listeners, (fn, ev) => ipcRenderer.removeListener(ev, fn))
    delete state.streams[id]
  }
}

const actions = {
  async runQuery ({ commit, state }, query) {
    const id = query.id
    if (!id) throw new Error('Missing query id')

    const listeners = {
      [`informer:stream-${id}:list`] (ev, list) {
        list.forEach((object) => {
          commit('APPLY_DELTA', id, { type: 'Sync', object })
        })
      },
      [`informer:stream-${id}:event`] (ev, delta) {
        commit('APPLY_DELTA', delta)
      }
    }

    const createEv = `informer:stream-created:${id}`
    const startEv = `informer:stream-started:${id}`
    const failEv = `informer:stream-failed:${id}`

    return promisifyEvents(ipcRenderer, createEv, failEv, () => {
      debug('Creating stream %j for %j', id, query)
      ipcRenderer.send('informer:create-stream', id, query)
    }).then(() => {
      commit('ADD_STREAM_LISTENERS', id, listeners)

      return promisifyEvents(ipcRenderer, startEv, failEv, () => {
        debug('Starting stream %j', id)
        ipcRenderer.send('informer:start-stream', id)
      })
    }).then(() => id)
  },

  listRunningQueries () {
    return ipcRenderer.sendSync('informer:list-streams-sync')
  },

  stopQuery ({ commit }, id) {
    debug('Stopping stream %j', id)
    commit('REMOVE_STREAM_LISTENERS', id)
    ipcRenderer.send('informer:destroy-stream', id)
  }
}

function promisifyEvents (emitter, successEvent, failureEvent, afterListen) {
  return new Promise((resolve, reject) => {
    function onFailure (ev, errObj) {
      emitter.removeListener(successEvent, onSuccess)

      const type = global[errObj.name]
      delete errObj.name

      const err = Object.create(type.prototype)
      Object.assign(err, errObj)
      reject(err)
    }

    function onSuccess (ev, val) {
      emitter.removeListener(failureEvent, onFailure)
      resolve(val)
    }

    emitter.once(successEvent, onSuccess)
    emitter.once(failureEvent, onFailure)

    if (afterListen) afterListen()
  })
}

export default {
  state,
  mutations,
  getters,
  actions
}
