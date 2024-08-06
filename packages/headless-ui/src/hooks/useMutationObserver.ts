import { useEffect } from 'react'

export const useMutationObserver = <T extends HTMLElement>(
  ref: T,
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
  }
) => {
  useEffect(() => {
    if (ref) {
      const observer = new MutationObserver(callback)
      observer.observe(ref, options)
      return () => observer.disconnect()
    }
  }, [callback, options, ref])
}
