import { flatMapDeep } from 'lodash-es'

export const recordValuesToString = (object: Record<string, any>) => {
  return flatMapDeep(object).join(' ')
}
