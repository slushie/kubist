'use strict'

import { ipcMain } from 'electron'
import KubernetesStream, { createClient, createEventSource } from 'kubernetes-stream'
import serializeError from 'serialize-error'

const debug = require('debug')('kubist:worker:informer')
const streams = {}

ipcMain.on('informer:create-stream', (event, id, query) => {
  try {
    if (!streams[id]) {
      const { kind, apiVersion, namespace } = query
      const client = createClient({ kind, apiVersion, namespace })
      const stream = streams[id] = new KubernetesStream({
        source: createEventSource(client),
        labelSelector: query.selector
      })

      debug('Created stream %j for query %j', id, query)

      const listEvent = `informer:stream-${id}:list`
      const deltaEvent = `informer:stream-${id}:event`
      stream.on('list', (list) => event.sender.send(listEvent, list))
        .on('event', (delta) => event.sender.send(deltaEvent, delta))
    }

    event.sender.send(`informer:stream-created:${id}`)
  } catch (err) {
    debug('Failed to create stream: %s', err)
    event.sender.send(`informer:stream-failed:${id}`, serializeError(err))
  }
}).on('informer:destroy-stream', (event, id) => {
  const stream = streams[id]
  if (!stream) return

  debug('Destroying stream %j', id)

  delete streams[id]
  stream.removeAllListeners()
  stream.close()
}).on('informer:watch-stream', async (event, id) => {
  const stream = streams[id]
  if (!stream) return

  try {
    debug('Listing stream %j', id)
    await stream.list()

    debug('Watching stream %j', id)
    stream.watch()

    const watchedEvent = `informer:stream-watched:${id}`
    event.sender.send(watchedEvent)
  } catch (err) {
    debug('Failed communicating with Kubernetes: %s', err)
    event.sender.send(`informer:stream-failed:${id}`, serializeError(err))
  }
}).on('informer:list-stream', async (event, id) => {
  const stream = streams[id]
  if (!stream) return

  await stream.list()
}).on('informer:list-streams-sync', (event) => {
  event.returnValue = Object.keys(streams)
})
