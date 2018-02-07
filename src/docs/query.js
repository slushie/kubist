import m from 'mithril'
import { localDB } from './db'

export function liveFind (query) {
  return localDB().liveFind(query)
    .on('update', () => setImmediate(m.redraw))
}
