import Vue from 'vue'
import axios from 'axios'
import debug from 'debug'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import 'shit'
require('shit')

Vue.use(ElementUI)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

console.log(debug.names)
Vue.prototype.$debug = function () {
  const name = this.constructor.options.name
  const logger = debug(`kubist:component:${name}`)
  debugger
  logger('hello')
}

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
