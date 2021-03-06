/***
**** https://bulma.io/documentation/elements/tag/
***/

import template from './template.jsx'

export default class Tag {
  constructor (vnode) {
    const attrs = vnode.attrs

    const _type = {
      'black': 'is-black',
      'dark': 'is-dark',
      'light': 'is-light',
      'white': 'is-white',
      'primary': 'is-primary',
      'info': 'is-info',
      'success': 'is-success',
      'warning': 'is-warning',
      'danger': 'is-danger'
    }

    const _size = {
      m: 'is-medium',
      l: 'is-large',
      s: 'is-small'
    }

    this.tagClass = 'tag'
    this.type = _type['black']
    this.size = _size['s']

    if (attrs.type) {
      this.type = _type[attrs.type]
      this.tagClass = `${this.tagClass} ${this.type}`
    }

    if (attrs.size) {
      this.size = _size[attrs.size]
      this.tagClass = `${this.tagClass} ${this.size}`
    }

    if (attrs.rounded) {
      this.tagClass = `${this.tagClass} is-rounded`
    }

    if (attrs.delete) {
      this.tagClass = `${this.tagClass} is-delete`
    }
  }

  view (vnode) {
    return template(vnode)
  }
}
