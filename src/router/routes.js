import m from 'mithril'
import routeResolver from './resolver'

export default function configureRoutes (root) {
  m.route(root, '/config', {
    '/ctrl/diff': routeResolver(require('@/ctrl/diff').default),
    '/config': routeResolver(require('@/ctrl/config').default)
  })
}
