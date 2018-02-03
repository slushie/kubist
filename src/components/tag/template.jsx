import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  
  const attrs = vnode.attrs
  const state = vnode.state

  return (
    <span className={state.tagClass}>
      {vnode.children}
    </span>
  )
}