import m from 'mithril'

import Layout from '@/components/layout'

export default function routeResolver (...children) {
  return {
    render () {
      return m(
        Layout,
        children.map(c => m(c))
      )
    }
  }
}
