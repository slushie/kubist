import m from 'mithril' // eslint-disable-line no-unused-vars

export function header (vnode) {
//  const { value } = vnode.state
  return (
    <div className='container'>
      <h1 className={'title'}>Document Data</h1>
      <h2 className='subtitle'>{}</h2>
    </div>
  )
}

export function body (vnode) {
//  const { value } = vnode.state
  return (
    <div className='container'>
      <h1>Document Data</h1>
    </div>
  )
}
