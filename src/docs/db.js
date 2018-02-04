import PouchDB from 'pouchdb'
import HttpPouchDB from 'http-pouchdb'
import pluginAllDBs from 'pouchdb-all-dbs'
import pluginFind from 'pouchdb-find'
import pluginLiveFind from 'pouchdb-live-find'

PouchDB.plugin(pluginAllDBs)
PouchDB.plugin(pluginFind)
PouchDB.plugin(pluginLiveFind)

let defaultDb
export function getLocalDB (name) {
  if (!defaultDb) {
    if (!name) throw new Error('Missing local DB')
    defaultDb = new PouchDB(name)
  }

  return defaultDb
}

export function listRemoteDBs (baseUrl) {
  return HttpPouchDB(PouchDB, baseUrl).allDbs()
}

let replication
export function replicateFrom (remoteUrl) {
  const name = remoteUrl.split('/').pop()
  replication = getLocalDB(name).replicate.from(
    new PouchDB(remoteUrl),
    { live: true, retry: true }
  )

  return replication
}

export function isReplicating () {
  return replication && !replication.cancelled
}
