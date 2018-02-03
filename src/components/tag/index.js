import template from './template.jsx'

export default class Tag {
  constructor (vnode) {
    const state = vnode.attrs

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

    this.type = _type['black']
    this.size = null

    if (state.type) {
      this.type = _type[state.type]
    }

    if (state.size) {
      this.size = _size[state.size]
    }

    this.tagClass = `tag ${this.type} ${this.size}`
  }

  view (vnode) {
    return template(vnode)
  }
}
