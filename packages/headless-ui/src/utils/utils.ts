import { uniqueId } from 'lodash-es'

export const getId = (prefix: string) => `${prefix}-${uniqueId()}`
