import m from 'mithril'

import HeaderLayout from '@/layouts/header'
import { header, body } from './view'

export default class DiffController {
  view (vnode) {
    return m(HeaderLayout, { header: header(vnode) }, body(vnode))
  }
}
