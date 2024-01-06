import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren, ReactNode } from 'react'

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
    <Flex dir='v'>
      {children}
      {comment}
    </Flex>
  )
}
