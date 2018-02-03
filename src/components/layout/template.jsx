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

      <Tag type='primary' size='m' rounded='true'>
        Testing
      </Tag>
      <Tag type='warning'>
        Warning!
        <button className='delete'/>
      </Tag>
      <Tag type='danger' delete='true'/>
    </div>
  )
}
