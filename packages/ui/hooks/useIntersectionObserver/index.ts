'use client'

import { isArray, isEmpty } from 'lodash-es'
import { useEffect, useState } from 'react'

export const useIntersectionObserver = (
  ref: HTMLElement | HTMLElement[],
  options: IntersectionObserverInit
): IntersectionObserverEntry[] | null => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = useState<
    IntersectionObserverEntry[] | null
  >(null)

  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') {
      return
    }

    if (!ref || (isArray(ref) && isEmpty(ref))) {
      return
    }

    const handler = (entries: IntersectionObserverEntry[]) => {
      setIntersectionObserverEntry(entries)
    }

    const observer = new IntersectionObserver(handler, options)

    if (isArray(ref)) {
      ref.forEach(item => {
        observer.observe(item)
      })
    } else {
      observer.observe(ref)
    }

    return () => {
      setIntersectionObserverEntry(null)

      observer.disconnect()
    }
  }, [ref, options])

  return intersectionObserverEntry
}
