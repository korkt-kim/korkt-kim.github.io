'use client'

import { useAnimate } from 'framer-motion'
import { PropsWithChildren, useEffect } from 'react'

import { Footer } from '@/features/Footer'
import { Header } from '@/features/Header'
import { useSidebarStore } from '@/store/sidebarStore'

2
export const AppShell = ({ children }: PropsWithChildren) => {
  const { isOpen } = useSidebarStore()
  const [scope, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    if (!scope.current) {
      return
    }

    animate(
      isOpen
        ? [[scope.current, { marginRight: '250px' }]]
        : [[scope.current, { marginRight: '0' }]]
    )
  }, [isOpen, animate, scope])

  return (
    <div ref={scope} className={`relative min-h-full relative pb-150  `}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
