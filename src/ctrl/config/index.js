import m from 'mithril'
import stream from 'mithril/stream'
import Notify from '@/components/notify'
import { singleton as model } from './model'
import view from './view'
import url from 'url'

const emptyDBs = [{
  disabled: true,
  value: '',
  label: 'No databases available'
}]

// controller
export default class ConfigController {
  constructor () {
    this.dbs = stream()
    this.selection = stream()

    this.baseUrl = stream('http://localhost:5984/')
  }

  oncreate () {
    this.listDBs()
      .then(m.redraw)
  }

  setBaseUrl (baseUrl) {
    this.baseUrl = baseUrl
    if (this.baseUrl.slice(-1) !== '/') {
      this.baseUrl += '/'
    }
  }

  listDBs () {
    this.dbs = stream()
    this.selection = stream()

    let baseUrl = this.baseUrl()
    if (baseUrl.slice(-1) !== '/') {
      baseUrl = this.baseUrl(baseUrl + '/')
    }

    return model.listDBs(baseUrl)
      .catch(Notify.handleRejection)
      .then((dbs) => {
        if (dbs && dbs.length) {
          const dbOptions = dbs.map((db) => ({
            label: db.replace(/^kubist\//, ''),
            value: url.resolve(baseUrl, encodeURIComponent(db))
          }))

          this.dbs(dbOptions)
          this.selection(dbOptions[0].value)
          m.redraw()
        } else { // invalid or empty data gets a generic message
          this.dbs(emptyDBs)
        }
      })
  }

  selectDB () {
    this.selection.map((remoteUrl) => {
      model.replicateDB(remoteUrl)
    })
  }

  view (vnode) {
    return view(vnode)
  }
}
