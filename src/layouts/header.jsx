import m from 'mithril' // eslint-disable-line no-unused-vars

export default class HeaderLayout {
  view (vnode) {
    const { header } = vnode.attrs
    const color = vnode.attrs.color || 'primary'

    return (
      <section className='section'>
        <article className={'hero is-medium is-' + color}>
          <div className='hero-body'>
            {header}
          </div>
        </article>
        {vnode.children}
      </section>
    )
  }
}
