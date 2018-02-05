import m from 'mithril'
import template from './template'

const messages = [] // just one global msg queue

const DEFAULT_DURATION = 3000

export default class Notify {
  static handleRejection (err) {
    const message = err && err.message ? err.message : err.toString()
    console.log('rejection', err)
    Notify.add({ message, color: 'danger' })
  }

  static add ({
    color = 'primary',
    duration = DEFAULT_DURATION,
    message
  }) {
    messages.push({
      color,
      message,
      expires: Date.now() + duration
    })

    setTimeout(m.redraw, duration)
    setImmediate(m.redraw)
  }

  static removeAt (index) {
    messages.splice(index, 1)
    setImmediate(m.redraw)
  }

  view () {
    const msg = messages[0]
    if (msg && msg.expires <= Date.now()) {
      messages.shift()
    }

    this.messages = messages.slice()
    return template.apply(this, arguments)
  }
}
