'use strict'

const { resolve, join } = require('path')

const env = process.env.NODE_ENV || 'development'
const prefix = resolve(join(__dirname, '..', 'db', env))
const PouchDB = require('pouchdb').defaults({ prefix })

module.exports = PouchDB

