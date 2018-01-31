import pouch from '@/lib/pouch'
import m from 'mithril'
import _ from 'lodash'

class Dashboard {
  constructor () {
    this.doc = null
  }

  oncreate () {
    this._redraw = _.throttle(() => m.redraw(), 100)

    pouch.localDb.changes({
      live: true,
      retry: true,
      include_docs: true
    })
      .on('change', (e) => {
        this._handleChange(e)
        setImmediate(this._redraw)
      })
  }

  _handleChange (info) {
    this.doc = info.doc
  }

  view () {
    return m('div', _.get(this.doc, 'metadata.namespace'))
  }
}

export default Dashboard
