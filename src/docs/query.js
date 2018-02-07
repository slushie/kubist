import m from 'mithril'

export function liveFind (db, query) {
  return db.liveFind(query)
    .on('update', () => setImmediate(m.redraw))
}
