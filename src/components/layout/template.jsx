import m from 'mithril' // eslint-disable-line no-unused-vars

import Navbar from '@/components/navbar'
import Tag from '@/components/tag'

export default function (vnode) {
  return (
    <div>
      <Navbar/>
      <div class='layout'>
        {vnode.children}
      </div>

      <Tag text='testing' type='primary' size='m' />
    </div>
  )
}
