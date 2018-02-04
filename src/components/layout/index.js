import template from './template'

export default class Layout {
  view (vnode) {
    return template(vnode)
  }
}
