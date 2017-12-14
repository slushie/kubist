'use strict'

import Vue from 'vue'

const state = {
  resources: {},
  streams: {}
}

const getters = {
  queryResults: (state) => (id) => state.resources[id]
}

const mutations = {
  INFORMER_APPLY_DELTA (state, id, delta) {
    let resources = state.resources[id]
    if (!resources) {
      resources = Vue.set(state.resources, id, {})
    }

    const { type, object } = delta
    switch (type) {
      case 'Added': case 'Updated': case 'Sync':
        Vue.set(resources, object.metadata.name, object)
        break

      case 'Deleted':
        delete resources[object.metadata.name]
        break
    }
  },
  INFORMER_CLEAR (state, id) {
    Vue.set(state.resources, id, {})
  }
}

export default {
  state,
  mutations,
  getters
}
