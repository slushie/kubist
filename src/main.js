import pouch from '@/lib/pouch'
import m from 'mithril'

import Home from './components/dashboard'

pouch.remotedb.info().then((info) => {
  console.log(info);
})

pouch.start()

// routing
m.route(document.body, "/dashboard", {
    "/dashboard": Home
})