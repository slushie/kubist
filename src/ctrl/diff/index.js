import m from 'mithril'

import HeaderLayout from '@/layouts/header'
import DiffModel from './model'
import { header, body } from './view'

export default class DiffController {
  oninit (vnode) {
    const remoteUrl = m.route.param('remoteUrl')
    if (!remoteUrl) {
      m.route.set('/config')
      return
    }

    this.model = new DiffModel(remoteUrl, m.redraw)
  }

  onremove (vnode) {
    if (this.model) {
      this.model.close()
    }
  }

  view (vnode) {
    const colorChanges = {
      Added: 'green',
      Updated: 'orange',
      Deleted: 'red'
    }

    this.info = this.model.info

    const len = Math.max(-5, -this.model.changes.length)
    this.changes = this.model.changes.slice(len).map((change) => ({
      color: colorChanges[change[0]],
      id: change[1]
    }))

    return m(HeaderLayout, { header: header(vnode) }, body(vnode))
  }
}
