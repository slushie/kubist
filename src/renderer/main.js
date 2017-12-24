import Vue from 'vue'
import axios from 'axios'
import debug from 'debug'
import { remote } from 'electron'
import PouchDB from 'pouchdb'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const apiUrl = remote.getGlobal('apiUrl')
const pouch = PouchDB.defaults({
  prefix: apiUrl + '/db'
})

pouch.plugin(require('pouchdb-find'))
pouch.plugin(require('pouchdb-live-find'))

Vue.use(require('vue-pouch'), { pouch })

Vue.prototype.$debug = function (fmt, ...varargs) {
  const name = this.constructor.options.name
  debug(`kubist:component:${name}`)
    .apply(null, arguments)
}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
