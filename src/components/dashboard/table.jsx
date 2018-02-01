import m from 'mithril' // eslint-disable-line no-unused-vars

import MyButton from '../my-button'

export default function (locals) {
  return (
    <table>
      <tr>
        <th>foo</th>
        <th>bar</th>
      </tr>
      <tr>
        <td>Hello,</td>
        <td>{locals.value} <MyButton title={"poop"}/></td>
      </tr>
    </table>
  )
}
