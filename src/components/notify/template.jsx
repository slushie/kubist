import m from 'mithril' // eslint-disable-line no-unused-vars

import Notify from '.'

export default function (vnode) {
  const { messages } = vnode.state
  const max = 3

  const notifications = messages.slice(0, max).map((msg, index) => (
    <div className={'notification is-' + msg.color}>
      <button className='delete' onclick={() => Notify.removeAt(index)} />
      {msg.message}
    </div>
  ))

  return (
    <div className='container' style='position: fixed; z-index: 1000'>
      {notifications}
    </div>
  )
}
