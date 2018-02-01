import template from './my-button.jsx'

export default class MyButton {
  constructor (vnode) {
    this.title = vnode.attrs.title || 'Click Me'
  }

  view () {
    return template(this)
  }
}
