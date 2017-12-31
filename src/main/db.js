'use strict'

import { resolve, join } from 'path'
import PouchDB from 'pouchdb'
import mkdirp from 'mkdirp'

const env = process.env.NODE_ENV || 'development'
const prefix = resolve(join(__dirname, '..', 'db', env)) + '/'
mkdirp.sync(prefix)

const Database = PouchDB.defaults({ prefix })
export default Database

Database.prototype.getOrNull = function () {
  return this.get.apply(this, arguments).catch((err) => {
    if (err.name === 'not_found') return null
    throw err
  })
}
