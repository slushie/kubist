import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/watch/:id',
      name: 'watch',
      component: require('@/components/WatchView').default
    },
    {
      path: '*',
      name: 'home',
      component: require('@/components/Home').default
    }
  ]
})
