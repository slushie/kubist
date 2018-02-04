import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (vnode) {
  const { docs } = vnode.state
  const rows = docs.map((doc) => (
    <tr>
      <td>{doc.kind}</td>
      <td>{doc.metadata.name}</td>
      <td>{doc.metadata.namespace}</td>
    </tr>
  ))
  return (
    <table class='table is-striped'>
      <tr>
        <th>Kind</th>
        <th>Name</th>
        <th>Namespace</th>
      </tr>
      {rows}
    </table>
  )
}
