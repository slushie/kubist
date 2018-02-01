import pouch from '@/lib/pouch'
import template from './table.jsx'

class Dashboard {
  constructor () {
    this.doc = null
    this.value = 'world'
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
    return template(this)
  }
}

export default Dashboard
