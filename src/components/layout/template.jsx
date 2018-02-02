import Navbar from '@/components/Navbar'
import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  return (
    <div>
      <Navbar />
      <div class='layout'>
        {vnode.children}
      </div>
    </div>
  )
}
