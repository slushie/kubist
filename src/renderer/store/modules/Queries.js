'use strict'

import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import { remote } from 'electron'

const state = {
  colors: [
    'red',
    'green',
    'blue',
    'orange',
    'cyan',
    'yellow'
  ],

  lastColorCounter: 0,

  watches: []
}

const has = (o, p) => o[p] !== undefined

function nextColor (state) {
  const color = state.colors[state.lastColorCounter]
  state.lastColorCounter = (1 + state.lastColorCounter) % state.colors
  return color
}

const http = axios.create({ baseURL: remote.getGlobal('apiUrl') + '/query/watch' })
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
  }
}

const getters = {
  queries: (state) => Object.values(state.queries),

  queryRoutes: (state) => {
    const queries = state.queries
    return Object.keys(queries)
      .map(id => ({ path: `/query/${id}`, name: queries[id].name }))
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
