import m from 'mithril'

import layoutResolver from './resolver'
import Dashboard from '@/components/dashboard'

m.route(document.body, '/dashboard', {
  '/dashboard': layoutResolver(Dashboard)
})
