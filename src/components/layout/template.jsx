import m from 'mithril' // eslint-disable-line no-unused-vars

import Notify from '../notify'

export default function (vnode) {
  return (
    <section class='section'>
      <Notify />

      <div class='container'>
        {vnode.children}
      </div>
    </section>
  )
}
