import m from 'mithril' // eslint-disable-line no-unused-vars

import Navbar from '@/components/navbar'

export default function (vnode) {
  return (
    <div>
      <Navbar/>
      <div class='layout'>
        {vnode.children}
      </div>
    </div>
  )
}
