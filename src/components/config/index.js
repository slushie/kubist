import m from 'mithril'
import url from 'url'
import { listRemoteDBs, replicateFrom } from '@/db'
import template from './template.jsx'

class Config {
  constructor () {
    this.dbs = []
    this.baseUrl = 'http://localhost:5984/'
    this.selected = ''
    this.listDBs()
  }

  setBaseUrl (url) {
    this.baseUrl = url
  }

  setSelected (url) {
    this.selected = url
  }

  listDBs () {
    if (this.listing) return
    this.listing = true

    if (this.baseUrl.slice(-1) !== '/') {
      this.baseUrl += '/'
    }

    return listRemoteDBs(this.baseUrl).then((dbs) => {
      if (dbs.error) {
        throw new Error([dbs.error, dbs.reason].filter(Boolean).join(': '))
      }

      this.listing = false
      this.dbs = dbs.filter(db => db.startsWith('kubist/'))
        .map((db) => ({
          title: db.replace(/^kubist\//, ''),
          value: url.resolve(this.baseUrl, encodeURIComponent(db))
        }))
      this.selected = this.dbs.length ? this.dbs[0].value : ''
    })
      .catch((err) => {
        this.listing = false
        this.selected = ''
        this.dbs = []
        console.error(err)
      })
      .then(() => {
        m.redraw()
      })
  }

  configureDB () {
    if (!this.selected) {
      throw new Error('No DB selected')
    }

    replicateFrom(this.selected)
      .on('active', () => m.route.set('/dashboard'))
  }

  view () {
    return template.apply(this, arguments)
  }
}

export default Config
