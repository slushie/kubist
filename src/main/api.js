'use strict'

import http from 'http'
import url from 'url'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import expressPouchDB from 'express-pouchdb'

import PouchDB from './db'
import QueryMiddleware from './query'

const api = express()
export default api

api.use(cors())
api.use(morgan(
  process.env.NODE_ENV !== 'development'
    ? 'combined'
    : 'dev'
))

api.use('/db', expressPouchDB(PouchDB))
api.use('/query', QueryMiddleware)

api.use((err, req, res, next) => {
  console.log('Error', err.stack)
  res.status(err.status || 500).json({
    error: {
      name: err.name || 'Error',
      message: process.env.NODE_ENV !== 'development'
        ? err.toString()
        : err.stack
    }
  })
})

api.start = async function (port, host) {
  const server = api.server = http.createServer(api)

  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) return reject(err)

      const bind = server.address()
      server.url = url.format({
        protocol: 'http',
        hostname: bind.address,
        port: bind.port
      })

      resolve(server.url)
    })
  })
}
