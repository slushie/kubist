'use strict'

import _ from 'lodash'
import ObjectStore from './store'

const debug = require('debug')('kubist:stream')
const streams = {}

export async function openObjectStream (id, stream, storeName) {
  if (streams[id]) throw new Error(`Stream ${id} already open`)

  const store = new ObjectStore(storeName)

  stream.on('list', (list) => {
    if (list.kind === 'Status') {
      const err = createStatusError(list)
      stream.emit('error', err)
      return
    }

    debug('%s returned with %d objects', list.kind, list.items.length)
    list.items.forEach(o => store.set(o))
  })
    .on('event', (ev) => {
      switch (ev.type) {
        case 'Error':
          const err = createStatusError(ev.object)
          stream.emit('error', err)
          break

        case 'Deleted':
          store.delete(ev.object)
          break

        case 'Added':
        case 'Modified':
          store.set(ev.object)
          break

        default:
          debug('Unhandled watch event', ev)
      }
    })

  debug('opening stream %j', id)
  await stream.list()
  await stream.watch()
  streams[id] = stream
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

function createStatusError (status) {
  const err = new Error(status.message)
  return Object.assign(err, _.pick(status, [
    'kind', 'status', 'code',
    'message', 'details', 'reason'
  ]))
}
