import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren, ReactNode } from 'react'

import { MainSidebar } from '@/features/Sidebars/Main'

type LayoutProps = Partial<PropsWithChildren>

interface LayoutPropsExtended extends LayoutProps {
  comment?: ReactNode
}

export default function Layout(props: LayoutProps | LayoutPropsExtended) {
  const { children, comment } = {
    comment: undefined,
    ...props,
  }

  return (
    <>
      <Flex direction='v'>
        {children}
        {comment}
      </Flex>
      <MainSidebar />
    </>
  )
}
