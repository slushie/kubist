'use strict'

import { resolve, join } from 'path'
import PouchDB from 'pouchdb'

const env = process.env.NODE_ENV || 'development'
const prefix = resolve(join(__dirname, '..', 'db', env))

export default PouchDB.defaults({ prefix })
