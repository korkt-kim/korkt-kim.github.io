import { DependencyList, useEffect } from 'react'

export function useResizeObserver(
  elementRef: HTMLElement | (() => HTMLElement),
  callback?: (entries: ResizeObserverEntry[]) => void,
  dependency: DependencyList = [],
  enabled = true
) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const resizeObserver = new ResizeObserver(entries => {
      callback?.(entries)
    })
    const element = typeof elementRef === 'function' ? elementRef() : elementRef

    if (element) {
      resizeObserver.observe(element)
    }

    return () => resizeObserver.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency)
}
