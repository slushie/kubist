import _ from 'lodash'
import PouchDB from './db'

const debug = require('debug')('kubist:store')

function getObjectId (object) {
  return _.get(object, 'metadata.uid')
}

function getObjectVersion (object) {
  return _.get(object, 'metadata.resourceVersion', '0')
}

export default class ObjectStore {
  constructor (name) {
    this.db = new PouchDB({
      name,
      prefix: '',
      adapter: 'memory'
    })
  }

  async set (object) {
    const id = object._id = getObjectId(object)
    const ver = getObjectVersion(object)

    debug('storing object %j', id, object)

    return this.db.getOrNull(id)
      .then((oldObject) => {
        if (oldObject) {
          const oldVer = getObjectVersion(oldObject)
          if (oldVer > ver) {
            debug('stored object %j version %j is newer than %j', id, oldVer, ver)
            throw new Error('Object conflict')
          }

          if (oldVer !== ver) {
            object._rev = oldObject._rev
            return this.db.put(object).then(() => object)
          }
        }

        return object
      })
  }

  async delete (object) {
    const id = getObjectId(object)
    debug('deleting object %j', id)

    return this.db.get(id).then(
      (o) => this.db.remove(o),
      (err) => {
        if (err.name === 'not_found') return
        throw err
      }
    )
  }
}
