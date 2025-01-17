'use client'

import { stagger, useAnimate } from 'framer-motion'
import { ComponentProps, PropsWithChildren, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

import { useBreakPoint } from '@/hooks/useBreakPoint'
import { useSidebarStore } from '@/store/sidebarStore'

import { ToggleButton } from './ToggleButton'

export type SidebarProps = ComponentProps<'aside'>

export const SidebarWrapper = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  const { setIsOpen, isOpen } = useSidebarStore()
  const { breakPoint } = useBreakPoint()
  const [scope, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    if (!scope.current || typeof breakPoint === 'undefined') {
      return
    }
    const aside = scope.current.querySelector('aside')

    if (!aside) {
      return
    }

    if (isOpen && breakPoint === 'desktop') {
      animate([
        ['path.top', { d: 'M 3 16.5 L 17 2.5' }],
        ['path.middle', { opacity: 0 }, { at: '<' }],
        ['path.bottom', { d: 'M 3 2.5 L 17 16.346' }, { at: '<' }],
        ['aside', { width: '250px' }, { at: '<' }],
        ['aside', { padding: '20px' }, { at: '<' }],
        ['aside *', { opacity: 1 }],
      ])
    } else {
      animate([
        ['path.top', { d: 'M 2 2.5 L 20 2.5' }],
        ['path.middle', { opacity: 1 }, { at: '<' }],
        ['path.bottom', { d: 'M 2 16.346 L 20 16.346' }, { at: '<' }],
        ['aside *', { opacity: 0 }, { at: '<', duration: 0 }],
        ['aside', { width: 0 }, { at: '<' }],
        ['aside', { padding: 0 }, { at: '<' }],
      ])
    }
  }, [animate, breakPoint, isOpen, scope])

  return (
    <div className='fixed bottom-0 right-0 z-10 ' ref={scope}>
      <aside
        id='sidebar'
        aria-hidden={!isOpen}
        className={twMerge(
          `fixed right-0 bottom-0 top-0 bg-neutral-800 w-0 text-gray-300 [&>*]:opacity-0`,
          className
        )}>
        {children}
      </aside>
      <ToggleButton
        aria-controls='sidebar'
        aria-label='Open sidebar'
        aria-expanded={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        className='sticky w-50 h-50 p-10 sm:hidden'
      />
    </div>
  )
}
