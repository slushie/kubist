import template from './template'
const messages = [] // just one global msg queue

const DEFAULT_DURATION = 5000

export default class Notify {
  static add ({
    color = 'primary',
    duration = DEFAULT_DURATION,
    message
  }) {
    messages.push({ color, message, expires: Date.now() + duration })
  }

  view () {
    const msg = messages[0]
    if (msg && msg.expires >= Date.now()) {
      messages.shift()
    }

    this.messages = messages
    return template.apply(this, arguments)
  }
}
