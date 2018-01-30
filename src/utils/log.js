import config from '@/config'

export function debug() {
  if (config.debug)
    console.log(...arguments);
}