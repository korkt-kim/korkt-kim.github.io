import { merge, omit } from 'lodash-es'

import config from '../tailwind.config.js'

export const withUI = (target: any) => {
  return merge({}, target, omit(config, 'content'))
}
