'use client'

import { ComponentProps, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { MotionDiv } from '@/libs/framer'

export type SidebarProps = ComponentProps<'aside'>

export const SidebarWrapper = ({
  children,
  className,
}: PropsWithChildren & { className?: string }) => {
  return (
    <MotionDiv
      initial={{ translateX: '100%' }}
      animate={{ translateX: 0 }}
      transition={{ duration: 1 }}
      className={twMerge(
        `fixed right-0 bottom-0 top-0 bg-neutral-800 z-40 p-20 w-[var(--sidebar-width)] text-gray-300 sm:hidden`,
        className
      )}>
      {children}
    </MotionDiv>
  )
}
