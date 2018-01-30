import config from '@/config'
import PouchDB from 'pouchdb'
import { debug } from '@/utils/log'

let localdb = new PouchDB(config.localdb)
let remotedb = new PouchDB(config.remotedb);

remotedb.info().then((info) => {
  console.log('RemoteDB info', info);
})

function start() {
  localdb.replicate.from(remotedb, 
  {
    live: true, 
    retry: true
  }
  ).on('change', (info) => {
    // handle change
    debug('root change', info)
  }).on('paused', (err) => {
    // replication paused (e.g. replication up to date, user went offline)
    debug('root paused', err)
  }).on('active', () => {
    // replicate resumed (e.g. new changes replicating, user went back online)
    debug('root active')
  }).on('denied', (err) => {
    // a document failed to replicate (e.g. due to permissions)
    debug('root denied', err)
  }).on('complete', (info) => {
    // handle complete
    debug('root complete', info)
  }).on('error', (err) => {
    // handle error
    debug('root error', err)
  });
}

function init_handler(db, obj) {
  if (!obj.change) {
    throw new Error('Remote handler does not have change a change method')
  }

  db.changes({
    live: true,
    include_docs: true
  }).on('change', obj.change)
  .on('complete', (info) => {
    if (obj.complete) {
      obj.complete(info);
    }
  })
  .on('error',  (err) => {
    console.log('RemoteDB error', err)
    
    if (obj.error) {
      obj.error(err);
    }
  });
}

function remote_handler(obj) {
  init_handler(remotedb, obj)
}

function local_handler(obj) {
  init_handler(localdb, obj)
}

export default { remote_handler, local_handler, start }