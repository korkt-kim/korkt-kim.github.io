'use client'

import { useWindowSize } from '@zakelstorm/ui'
import { useEffect, useState } from 'react'

const listener = (width: number) => {
  if (typeof window === 'undefined') {
    return undefined
  }

  if (width < 1100) {
    return 'tablet'
  }

  return 'desktop'
}

export const useBreakPoint = () => {
  const { width } = useWindowSize()
  const [breakPoint, setBreakPoint] = useState<
    'tablet' | 'desktop' | undefined
  >()

  useEffect(() => {
    setBreakPoint(listener(width))
  }, [width])

  return { breakPoint }
}
