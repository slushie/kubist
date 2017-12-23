'use strict'

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

module.exports = api
