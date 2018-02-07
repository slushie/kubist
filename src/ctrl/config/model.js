import { listRemoteDBs, replicateFrom } from '@/docs'

export default class ConfigModel {
  listDBs (baseUrl) {
    return listRemoteDBs(baseUrl).then((dbs) => {
      if (dbs.error) {
        throw new Error([dbs.error, dbs.reason].filter(Boolean).join(': '))
      }
      return dbs
    })
  }

  replicateDB (remoteUrl) {
    return replicateFrom(remoteUrl)
  }
}

export const singleton = new ConfigModel()
