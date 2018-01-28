import config from '../config'
import PouchDB from 'pouchdb'

let localdb = new PouchDB(config.localdb)
let remotedb = new PouchDB(config.remotedb);

localdb.changes({
  live: true,
  include_docs: true
}).on('change', (change) => {
  // handle change
  console.log('1 - change', change)
}).on('complete', (info) => {
  // changes() was canceled
  console.log('1 - complete', info)
}).on('error',  (err) => {
  console.log('1 - error', err)
});

localdb.changes({
  live: true,
  include_docs: true
}).on('change', (change) => {
  // handle change
  console.log('2 - change', change)
}).on('complete', (info) => {
  // changes() was canceled
  console.log('2 - complete', info)
}).on('error',  (err) => {
  console.log('2 - error', err)
});

function start() {
  localdb.replicate.from(remotedb, 
  {
    live: true, 
    retry: true
  }
  ).on('change', (info) => {
    // handle change
    console.log('change', info)
  }).on('paused', (err) => {
    // replication paused (e.g. replication up to date, user went offline)
    console.log('paused', err)
  }).on('active', () => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    console.log('active')
  }).on('denied', (err) => {
    // a document failed to replicate (e.g. due to permissions)
    console.log('denied', err)
  }).on('complete', (info) => {
    // handle complete
    console.log('complete', info)
  }).on('error', (err) => {
    // handle error
    console.log('error', err)
  });
}

export default { localdb, remotedb, start }