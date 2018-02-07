import { replicateFrom } from '@/docs'

export default class DiffModel {
  constructor (remoteUrl, changeCallback) {
    this.info = null
    this.changes = []
    this.callback = changeCallback
    this.replication = replicateFrom(remoteUrl)
      .on('change', this.handleChanges.bind(this))
  }

  close () {
    this.replication.cancel()
  }

  handleChanges (info) {
    this.info = info
    const changes = info.docs.map((doc) => [
      doc._deleted ? 'Deleted' : doc._rev.startsWith('1-') ? 'Added' : 'Updated',
      doc._id
    ])

    this.changes.push(...changes)

    if (typeof this.callback === 'function') {
      console.log('callback', changes)
      this.callback.call(null, changes)
    }
  }
}
