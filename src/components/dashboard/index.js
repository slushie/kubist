import pouch from '@/lib/pouch'
import m from 'mithril'
import _ from 'lodash'

class Dashboard {
  constructor () {
    this.doc = null
  }

  oncreate () {
    this.changes = pouch.watchChanges({
      live: true,
      retry: true,
      include_docs: true
    })
      .on('change', (e) => {
        this._handleChange(e)
      })
  }

  _handleChange (info) {
    this.doc = info.doc
  }

  view () {
    return m('div', _.get(this.doc, 'metadata.resourceVersion'))
  }
}

export default Dashboard
