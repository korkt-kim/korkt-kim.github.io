import { uniqueId } from 'lodash-es'
import { useRef } from 'react'

export const getId = () => {
  const suffixId = uniqueId()

  return (prefix: string) => {
    return `${prefix}-${suffixId}`
  }
}

export const useGetId = () => {
  const suffixId = useRef(uniqueId())

  return <T extends object>(obj: T) => {
    return Object.entries(obj).reduce<
      Record<string, string | ((...args: any[]) => string)>
    >((acc, item) => {
      const [key, value] = item
      acc[key] = `${value}-${suffixId.current}`

      return acc
    }, {}) as { [key in keyof T]: T[key] }
  }
}

export const isInState =
  <T extends string>() =>
  (states: T[], currentState: T) => {
    if (states.includes(currentState)) {
      return true
    }

    return false
  }

export const getStyleProperty = (comp: Element, attribute: string) => {
  if (!window) {
    return
  }

  return window.getComputedStyle(comp).getPropertyValue(attribute)
}
