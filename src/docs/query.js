import m from 'mithril'
import _ from 'lodash'

import { getLocalDB } from './db'

export function liveFind (query) {
  return getLocalDB().liveFind(query)
    .on('update', () => setImmediate(m.redraw))
}
