import m from 'mithril'

import { replication } from '@/docs'
import Layout from '@/components/layout'

const CONFIG_PATH = '/config'

export default function routeResolver (...children) {
  return {
    onmatch (args, path) {
      if (path !== CONFIG_PATH && !replication()) {
        m.route.set(CONFIG_PATH)
      }
    },

    render () {
      return m(
        Layout,
        children.map(c => m(c))
      )
    }
  }
}
