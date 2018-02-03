import m from 'mithril'

import layoutResolver from './resolver'
import Dashboard from '@/components/dashboard'
import Demo from '@/components/demo'

m.route(document.body, '/dashboard', {
  '/dashboard': layoutResolver(Dashboard),
  '/demo': layoutResolver(Demo)
})
