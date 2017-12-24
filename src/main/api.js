'use strict'

const http = require('http')
const url = require('url')
const morgan = require('morgan')
const expressPouchDB = require('express-pouchdb')
const api = require('express')()
const PouchDB = require('./db')

api.use(morgan(
  process.env.NODE_ENV !== 'development'
    ? 'combined'
    : 'dev'
))

api.use('/db', expressPouchDB(PouchDB))
api.use('/query', require('./query'))

api.use((err, req, res, next) => {
  console.log('Error', err.stack)
  res.status(err.status || 500).send(
    process.env.NODE_ENV !== 'development'
      ? err.toString()
      : err.stack
  )
})

api.start = async function (port, host) {
  const server = api.server = http.createServer(api)

  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) return reject(err)

      const bind = server.address()
      server.url = url.format({
        protocol: 'http',
        host: [bind.address, bind.port].join(':')
      })

      resolve(server.url)
    })
  })
}

module.exports = api
