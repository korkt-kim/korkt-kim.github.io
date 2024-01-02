import { flatMapDeep } from 'lodash-es'

export const recordValuesToString = (object: Record<string, any>): string => {
  return flatMapDeep(object, (res: string | Record<string, any>) => {
    if (typeof res === 'string') {
      return res
    } else {
      return recordValuesToString(res)
    }
  }).join(' ')
}
