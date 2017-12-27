'use strict'

import PouchDB from './db'
import _ from 'lodash'

const debug = require('debug')('kubist:stream')
const Objects = new PouchDB('objects')
const streams = {}

export async function openObjectStream (id, stream) {
  if (streams[id]) throw new Error(`Stream ${id} already open`)
  streams[id] = stream

  stream.on('list', (list) => {
    if (list.kind === 'Status') {
      const err = createStatusError(list)
      stream.emit('error', err)
      return
    }

    debug('%s returned with %d objects', list.kind, list.items.length)
    list.items.forEach(storeObject)
  })
    .on('event', (ev) => {
      switch (ev.type) {
        case 'Error':
          const err = createStatusError(ev.object)
          stream.emit('error', err)
          break

        case 'Deleted':
          deleteObject(ev.object)
          break

        case 'Added':
        case 'Modified':
          storeObject(ev.object)
          break

        default:
          debug('Unhandled watch event', ev)
      }
    })
}

export async function closeStream (id) {
  const stream = streams[id]
  delete streams[id]

  try {
    stream.close()
  } catch (err) {
    debug('failed to close stream %j', id, err)
  }
}

function getObjectId (object) {
  return _.get(object, 'metadata.uid')
}

function getObjectVersion (object) {
  return _.get(object, 'metadata.resourceVersion', '0')
}

export function storeObject (object) {
  const id = object._id = getObjectId(object)
  const ver = getObjectVersion(object)
  const $skip = {}

  debug('storing object %j', id, object)

  return Objects.get(id).then((oldObject) => {
    const oldVer = getObjectVersion(oldObject)
    if (oldVer > ver) {
      debug('stored object %j version %j is newer than %j', id, oldVer, ver)
      throw new Error('Object conflict')
    } else if (oldVer === ver) {
      throw $skip
    } else {
      object._rev = oldObject._rev
      return object
    }
  }, (err) => {
    if (err.error === 'not_found') return object
    throw err
  })
    .then((object) => Objects.put(object))
    .then(() => object)
    .catch((err) => {
      if (err === $skip) return object
      debug('failed to store object %j', id, err.stack)
      throw err
    })
}

export function deleteObject (object) {
  const id = getObjectId(object)
  debug('deleting object %j', id)
  return Objects.get(id).then(
    (o) => Objects.remove(o),
    (err) => {
      if (err.error === 'not_found') return
      throw err
    }
  )
}

function createStatusError (status) {
  const err = new Error(status.message)
  return Object.assign(err, _.pick(status, [
    'kind', 'status', 'code',
    'message', 'details', 'reason'
  ]))
}
