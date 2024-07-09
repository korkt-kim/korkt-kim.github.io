import { uniqueId } from 'lodash-es'

export const getId = (prefix: string) => `${prefix}-${uniqueId()}`

export const isInState =
  <T extends string>() =>
  (states: T[], currentState: T) => {
    if (states.includes(currentState)) {
      return true
    }

    return false
  }
