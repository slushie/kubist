import pouch from '@/lib/pouch'
import m from 'mithril'

import Dashboard from './components/dashboard'

pouch.start()

// routing
m.route(document.body, "/dashboard", {
    "/dashboard": Dashboard
})