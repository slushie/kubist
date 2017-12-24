'use strict'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// start the api backend
const api = require('./api')
api.start().then((url) => {
  console.log('api at %j', url)
  global.apiUrl = url
})

require('./window')
