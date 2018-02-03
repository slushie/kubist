/***
**** https://bulma.io/documentation/elements/tag/
***/

import template from './template.jsx'

export default class Tag {
  constructor (vnode) {
    console.log(vnode)
    const attrs = vnode.attrs

    this.tagClass = `tags`

    if (attrs.addons) {
      this.tagClass = `${this.tagClass} has-addons`
    }
  }

  view (vnode) {
    return template(vnode)
  }
}
