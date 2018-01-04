'use strict'

import KubernetesStream from 'kubernetes-stream'
import bodyParser from 'body-parser'
import { Router } from 'express'
import { openObjectStream, closeStream } from './stream'
import PouchDB from './db'

const Queries = new PouchDB('queries')

const router = Router()
export default router

const debug = require('debug')('kubist:query')
const watching = {}

router.get('/watch', (req, res) => {
  return res.json({ watching: Object.keys(watching) })
})

router.post('/watch/:id', bodyParser.json(), async (req, res, next) => {
  const id = req.params.id

  try {
    const query = await Queries.get(id)

    if (watching[id]) return res.json({ watching: true })
    watching[id] = true

    const { resource, namespace } = query
    const stream = new KubernetesStream({
      labelSelector: query.selector,
      resource,
      namespace
    })

    debug('created stream for query', query)
    const store = req.body.store || new Date().toISOString()

    await openObjectStream(id, stream, store)

    res.json({ id, watching: true })
  } catch (err) {
    watching[id] = false
    next(err)
  }
})

router.delete('/watch/:id', async (req, res, next) => {
  const id = req.params.id

  if (!watching[id]) return res.json({ watching: false })
  delete watching[id]

  try {
    await closeStream(id)
    res.json({ id, watching: false })
  } catch (err) {
    next(err)
  }
})
