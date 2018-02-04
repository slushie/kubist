import m from 'mithril'
import _ from 'lodash'

import { getLocalDB } from './db'

export const REDRAW_INTERVAL = 100

const redraw = _.throttle(m.redraw, REDRAW_INTERVAL)

export function liveFind (query) {
  return getLocalDB().liveFind(query)
    .on('update', () => setImmediate(redraw))
}
