import m from 'mithril'
import routeResolver from './resolver'

export default function configureRoutes (root) {
  m.route(root, '/config', {
    '/config': routeResolver(require('@/components/config').default),
    '/dashboard': routeResolver(require('@/components/dashboard').default)
  })
}
