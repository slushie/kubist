'use strict'

import _ from 'lodash'
import Vue from 'vue'

const state = {
  queries: {
    'test-query': {
      id: 'test-query',
      name: 'Test Query',
      resource: 'v1/pod',
      namespace: 'default',
      color: 'green'
    }
  },

  colors: [
    'red',
    'green',
    'blue',
    'orange',
    'cyan',
    'yellow'
  ],

  lastColorCounter: 0
}

const has = (o, p) => o[p] !== undefined

function nextColor (state) {
  const color = state.colors[state.lastColorCounter]
  state.lastColorCounter = (1 + state.lastColorCounter) % state.colors
  return color
}

const mutations = {
  STORE_QUERY (state, query) {
    if (!has(query, 'name')) throw new TypeError('Missing name')
    if (!has(query, 'kind')) throw new TypeError('Missing kind')
    if (!has(query, 'apiVersion')) throw new TypeError('Missing apiVersion')
    if (!has(query, 'selector')) throw new TypeError('Missing selector')
    if (!has(query, 'color')) query.color = nextColor(state)

    query.id = _.kebabCase(query.name)
    if (has(state.queries, query.id)) throw new Error(`Query ${query.id} exists`)
    Vue.set(state.queries, query.id, _.clone(query))
  },

  DELETE_QUERY (state, id) {
    delete state.queries[id]
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
  getters
}
