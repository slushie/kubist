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
      path: '/query',
      name: 'create-query',
      component: require('@/components/QueryView').default
    },
    {
      path: '*',
      redirect: { name: 'query-view', params: { id: null } }
    }
  ]
})
