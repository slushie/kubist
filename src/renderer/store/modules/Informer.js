'use strict'

import Vue from 'vue'

import { createClient, createEventSource } from 'kubernetes-stream/src/kubernetes'
import KubernetesStream from 'kubernetes-stream/src/stream'

const state = {
  objects: {},
  streams: {}
}

const streams = {}

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

  CREATE_STREAM (state, query) {
    if (!query.id) throw new TypeError('No query id')
    if (streams[query.id]) return

    const { kind, apiVersion, namespace } = query
    const client = createClient({ kind, apiVersion, namespace })

    streams[query.id] = new KubernetesStream({
      source: createEventSource(client),
      labelSelector: query.selector
    })

    Vue.set(state.streams, query.id, true)
  },

  DELETE_STREAM (state, id) {
    delete streams[id]
    delete state.streams[id]
  }
}

const actions = {
  async runQuery ({ commit, state }, query) {
    commit('CREATE_STREAM', query)

    const id = query.id
    const stream = streams[id]

    stream.on('list', (list) => {
      list.forEach((object) => {
        commit('APPLY_DELTA', id, { type: 'Sync', object })
      })
    }).on('event', (delta) => {
      commit('APPLY_DELTA', delta)
    })

    await stream.list()
    return stream.watch()
  },

  stopQuery ({ commit, state }, id) {
    const stream = streams[id]
    commit('DELETE_STREAM', id)

    stream.removeAllListeners()
    stream.close()
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
