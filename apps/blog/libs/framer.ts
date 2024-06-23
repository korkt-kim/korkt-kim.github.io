'use client'

import dynamic from 'next/dynamic'

export const LazyMotion = dynamic(() =>
  import('framer-motion').then(mod => mod.LazyMotion)
)

export { domAnimation } from 'framer-motion'
