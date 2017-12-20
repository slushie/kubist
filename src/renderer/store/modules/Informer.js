'use strict'

import _ from 'lodash'
import Vue from 'vue'
import { ipcRenderer } from 'electron'

const debug = require('debug')('kubist:store:informer')

const state = {
  objects: {},
  streams: {}
}

const mutations = {
  APPLY_DELTA (state, { id, delta }) {
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

  ADD_STREAM_LISTENERS (state, { id, listeners }) {
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
  async runQuery ({ commit, dispatch }, query) {
    const id = query.id
    if (!id) throw new Error('Missing query id')

    const createEv = `informer:stream-created:${id}`
    const watchEv = `informer:stream-watched:${id}`
    const failEv = `informer:stream-failed:${id}`

    await promisifyEvents(ipcRenderer, createEv, failEv, () => {
      debug('Creating stream %j for %j', id, query)
      ipcRenderer.send('informer:create-stream', id, query)
    })

    await dispatch('listenForQueryResults', id)

    await promisifyEvents(ipcRenderer, watchEv, failEv, () => {
      debug('Watching stream %j', id)
      ipcRenderer.send('informer:watch-stream', id)
    })

    return id
  },

  async syncQueryResults (_, id) {
    return ipcRenderer.send('informer:list-stream', id)
  },

  listRunningQueries () {
    return ipcRenderer.sendSync('informer:list-streams-sync')
  },

  async listenForQueryResults ({ commit }, id) {
    const listeners = {
      [`informer:stream-${id}:list`] (ev, list) {
        debug('Stream %j has %d objects', id, list.items.length)
        list.items.forEach((object) => {
          const delta = { type: 'Sync', object }
          commit('APPLY_DELTA', { id, delta })
        })
      },
      [`informer:stream-${id}:event`] (ev, delta) {
        debug('Stream %j got delta %j', id, delta.type)
        commit('APPLY_DELTA', { id, delta })
      }
    }

    commit('ADD_STREAM_LISTENERS', { id, listeners })
  },

  stopQuery ({ commit }, id) {
    debug('Stopping stream %j', id)
    commit('REMOVE_STREAM_LISTENERS', id)
    ipcRenderer.send('informer:destroy-stream', id)
  }
}

async function promisifyEvents (emitter, successEvent, failureEvent, afterListen) {
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
  actions
}
