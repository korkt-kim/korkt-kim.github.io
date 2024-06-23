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
      aside.style.display = 'block'
      animate([
        ['path.top', { d: 'M 3 16.5 L 17 2.5' }],
        ['path.middle', { opacity: 0 }, { at: '<' }],
        ['path.bottom', { d: 'M 3 2.5 L 17 16.346' }, { at: '<' }],
        ['aside', { transform: 'translateX(0)' }, { at: '<' }],
        [
          'li',
          { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
          { delay: stagger(0.05) },
        ],
      ])
    } else {
      animate([
        ['path.top', { d: 'M 2 2.5 L 20 2.5' }],
        ['path.middle', { opacity: 1 }, { at: '<' }],
        ['path.bottom', { d: 'M 2 16.346 L 20 16.346' }, { at: '<' }],
        ['aside', { transform: 'translateX(100%)' }, { at: '<' }],
      ]).then(() => {
        aside.style.display = 'none'
      })
    }
  }, [animate, breakPoint, isOpen, scope])

  return (
    <div className='fixed bottom-0 right-0 z-10 ' ref={scope}>
      <aside
        id='sidebar'
        aria-hidden={!isOpen}
        className={twMerge(
          `fixed right-0 bottom-0 top-0 bg-neutral-800 p-20 w-[var(--sidebar-width)] text-gray-300 translate-x-full`,
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
