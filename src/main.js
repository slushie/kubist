import pouch from './lib/pouch'
import m from 'mithril'

import Home from './components/home'

pouch.start()

pouch.remotedb.info().then((info) => {
  console.log(info);
})

// routing
m.route(document.body, "/home", {
    "/home": Home
})