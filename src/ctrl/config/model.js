import { listRemoteDBs } from '@/docs'

export default class ConfigModel {
  listDBs (baseUrl) {
    return listRemoteDBs(baseUrl).then((dbs) => {
      if (dbs.error) {
        throw new Error([dbs.error, dbs.reason].filter(Boolean).join(': '))
      }
      return dbs
    })
  }
}

export const singleton = new ConfigModel()
