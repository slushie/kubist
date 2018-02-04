import m from 'mithril'
import Pouch from '@/lib/pouch'
import template from './template.jsx'

class Dashboard {
  constructor () {
    this.docs = []
  }

  oncreate () {
    Pouch.localDb.allDocs({
      include_docs: true,
      limit: 15
    }).then((results) => {
      this.docs = results.rows.map(r => r.doc)
      this.watchChanges()
      m.redraw()
    }).catch((err) => {
      console.error(err)
    })
  }

  watchChanges () {
    if (this.changes) this.changes.cancel()
    this.changes = Pouch.watchChanges({
      live: true,
      retry: true,
      doc_ids: this.docs.map(d => d._id)
    })
  }

  onremove () {
    if (this.changes) this.changes.cancel()
  }

  view (vnode) {
    return template(vnode)
  }
}

export default Dashboard
