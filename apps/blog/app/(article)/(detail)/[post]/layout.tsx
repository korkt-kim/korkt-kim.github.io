import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren, ReactNode } from 'react'

import { ArticleSidebar } from '@/features/Sidebars/ArticleSidebar'

interface LayoutProps extends PropsWithChildren {
  comment: ReactNode
}

export default function Layout(props: LayoutProps) {
  const { children, comment } = props

  return (
    <>
      <Flex direction='v'>
        {children}
        {comment}
      </Flex>
      <ArticleSidebar className='sm:hidden' />
    </>
  )
}
