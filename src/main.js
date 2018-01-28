import config from './config'
import PouchDB from 'pouchdb'
import m from 'mithril'

import home from './components/home'

let localdb = new PouchDB(config.localdb)
let remotedb = new PouchDB(config.remotedb);

remotedb.info().then((info) => {
  console.log(info);
})

// remotedb.get('Pod/default/hello-minikube-c6c6764d-2l26r').then((doc) => {
//   console.log(doc);
// });

localdb.replicate.from(remotedb, 
  {
    live: true, 
    retry: true
  }
).on('change', function (info) {
  // handle change
  console.log('change', info)
}).on('paused', function (err) {
  // replication paused (e.g. replication up to date, user went offline)
  console.log('paused', err)
}).on('active', function () {
  // replicate resumed (e.g. new changes replicating, user went back online)
  console.log('active')
}).on('denied', function (err) {
  // a document failed to replicate (e.g. due to permissions)
  console.log('denied', err)
}).on('complete', function (info) {
  // handle complete
  console.log('complete', info)
}).on('error', function (err) {
  // handle error
  console.log('error', err)
});

m.mount(document.body, home)