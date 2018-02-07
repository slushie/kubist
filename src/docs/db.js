import PouchDB from 'pouchdb'
import HttpPouchDB from 'http-pouchdb'
import pluginAllDBs from 'pouchdb-all-dbs'
import pluginFind from 'pouchdb-find'
import pluginLiveFind from 'pouchdb-live-find'

import { debug } from '@/utils/log'

PouchDB.plugin(pluginAllDBs)
PouchDB.plugin(pluginFind)
PouchDB.plugin(pluginLiveFind)

export function listRemoteDBs (baseUrl) {
  return HttpPouchDB(PouchDB, baseUrl).allDbs()
}

let replication
export function replicateFrom (remoteUrl) {
  const name = remoteUrl.split('/').pop()
  const localDB = new PouchDB(name)

  if (isReplicating()) replication.cancel()

  replication = localDB.replicate.from(
    new PouchDB(remoteUrl),
    { live: true, retry: true, return_docs: false }
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
  })

  return replication
}

export function isReplicating () {
  return replication && !replication.cancelled
}
