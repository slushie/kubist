import m from 'mithril' // eslint-disable-line no-unused-vars

export function header (vnode) {
  const { info } = vnode.state

  return (
    <div className='container' onclick={() => {}}>
      <h1 className={'title'}>Documents</h1>
      <h2 className='subtitle'>{info ? info.docs_read : '0'} documents replicated</h2>
    </div>
  )
}

export function body (vnode) {
  const { changes } = vnode.state
  return (
    <div className='container'>
      <ul>
        {changes.map(c => <li style={{color: c.color}}>{c.id}</li>)}
      </ul>
    </div>
  )
}
