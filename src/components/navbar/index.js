import m from 'mithril'
import template from './template.jsx'
import _ from 'lodash'

export default class Navbar {
  constructor (vnode) {
    this.activeRoute = {
      'dashboard': false,
      'demo': false
    }

    this._setActive()
  }

  _setActive () {
    _.forOwn(this.activeRoute, (value, key, obj) => {
      obj[key] = false
    })

    this.path = m.route.get().replace('/', '')
    this.activeRoute[this.path] = true
  }

  view (vnode) {
    this._setActive()

    return template(vnode)
  }
}
