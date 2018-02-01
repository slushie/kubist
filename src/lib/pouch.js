import PouchDB from 'pouchdb'
import _ from 'lodash'
import m from 'mithril'

import config from '@/config'
import { debug } from '@/utils/log'

const localDb = new PouchDB(config.localdb)
const remoteDb = new PouchDB(config.remotedb)

export const REDRAW_INTERVAL = 100

remoteDb.info().then((info) => {
  console.log('RemoteDB info', info)
})

function start () {
  return localDb.replicate.from(remoteDb,
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
  })
}

const redraw = _.throttle(() => { m.redraw() }, REDRAW_INTERVAL)

function watchChanges () {
  return localDb.changes(...arguments)
    .on('change', () => { setImmediate(redraw) })
}

export default {
  localDb,
  remoteDb,
  start,
  watchChanges
}
