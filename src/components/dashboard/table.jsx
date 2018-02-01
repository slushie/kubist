import m from 'mithril' // eslint-disable-line no-unused-vars

export default function (locals) {
  return (
    <table>
      <tr>
        <th>foo</th>
        <th>bar</th>
      </tr>
      <tr>
        <td>Hello,</td>
        <td>{locals.value}</td>
      </tr>
    </table>
  )
}
