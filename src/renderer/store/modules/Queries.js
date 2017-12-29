'use strict'

import axios from 'axios'
import { remote } from 'electron'

const http = axios.create({
  baseURL: remote.getGlobal('apiUrl') + '/query/watch'
})

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'cyan',
  'yellow'
]

const state = {
  colors,
  lastColorCounter: Math.floor(Math.random() * colors.length),

  watches: []
}

const getters = {
  color: (state) => state.colors[state.lastColorCounter],
  isWatching: (state) => (id) => ~state.watches.indexOf(id)
}

const actions = {
  async createWatch ({ commit }, id) {
    await http.post(id)
    commit('ADD_WATCH', id)
  },

  async deleteWatch ({ commit }, id) {
    await http.delete(id)
    commit('REMOVE_WATCH', id)
  },

  async syncWatches ({ commit }) {
    const watches = await http.get('')
    commit('SET_WATCHES', watches.data.watching)
  },

  async nextColor ({ commit, getters }) {
    const color = getters.color
    commit('CYCLE_COLOR')
    return color
  }
}

const mutations = {
  ADD_WATCH (state, id) {
    if (~state.watches.indexOf(id)) return
    state.watches.push(id)
  },

  REMOVE_WATCH (state, id) {
    state.watches = state.watches.filter(w => w !== id)
  },

  SET_WATCHES (state, ids) {
    state.watches = ids.map(x => x)
  },

  CYCLE_COLOR (state) {
    state.lastColorCounter = (1 + state.lastColorCounter) % state.colors
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
