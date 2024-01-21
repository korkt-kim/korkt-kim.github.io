import { Flex } from '@zakelstorm/ui'
import { ComponentProps, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type SidebarProps = PropsWithChildren & ComponentProps<'aside'>

export const Sidebar = ({ children, ...props }: SidebarProps) => {
  const { className, ...rest } = props

  return (
    <aside
      className={twMerge(
        `fixed right-0 bottom-0 top-0 bg-neutral-800 z-40 p-20 w-[var(--sidebar-width)] text-gray-300`,
        className
      )}
      {...rest}>
      {children}
    </aside>
  )
}
