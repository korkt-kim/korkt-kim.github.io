import { DependencyList, useEffect } from 'react'

export const useMutationObserver = (
  ref: HTMLElement | (() => HTMLElement),
  callback: MutationCallback,
  options: Partial<{
    attributes: boolean
    characterData: boolean
    childList: boolean
    subtree: boolean
  }> = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
  dependency: DependencyList = [],
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const target = typeof ref === 'function' ? ref() : ref

    if (target) {
      const observer = new MutationObserver(callback)

      observer.observe(target, options)
      return () => {
        observer.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...dependency])
}
