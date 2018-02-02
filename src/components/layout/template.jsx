import m from 'mithril' // eslint-disable-line no-unused-vars

import Navbar from '@/components/navbar'

export default function (vnode) {
  return (
    <div>
      <Navbar/>
      <div class='columns'>
        <div class='column'>
          {vnode.children}
        </div
      </div>
    </div>
  )
}
