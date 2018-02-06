import m from 'mithril' // eslint-disable-line no-unused-vars

export default class SectionLayout {
  view (vnode) {
    return (
      <section className='section'>
        {vnode.children}
      </section>
    )
  }
}
