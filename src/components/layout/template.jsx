import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  return (
    <div class='columns'>
      <div class='column'>
        {vnode.children}
      </div>
    </div>
  )
}
