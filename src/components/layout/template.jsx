import m from 'mithril' // eslint-disable-line no-unused-vars

// import Navbar from '@/components/navbar'

export default function (vnode) {
  return (
    <section class='section'>
      <div class='container'>
        {vnode.children}
      </div>
    </section>
  )
}
