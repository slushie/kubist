'use strict'

import { resolve, join } from 'path'
import PouchDB from 'pouchdb'
import mkdirp from 'mkdirp'

const env = process.env.NODE_ENV || 'development'
const prefix = resolve(join(__dirname, '..', 'db', env)) + '/'
mkdirp.sync(prefix)

export default PouchDB.defaults({ prefix })
