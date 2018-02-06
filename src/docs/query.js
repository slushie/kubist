import m from 'mithril'
import { getLocalDB } from './db'

export function liveFind (query) {
  return getLocalDB().liveFind(query)
    .on('update', () => setImmediate(m.redraw))
}
