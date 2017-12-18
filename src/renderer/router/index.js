import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/query/:id',
      name: 'query-view',
      component: require('@/components/QueryView').default
    },
    {
      path: '*',
      redirect: '/query/test-query'
    }
  ]
})
