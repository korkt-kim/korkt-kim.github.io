import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren } from 'react'

export const BasicPageTemplate = ({ children }: PropsWithChildren) => {
  return <Flex justify='center'>{children}</Flex>
}

const Content = ({ children }: PropsWithChildren) => {
  return <div className='md:w-750 sm:w-auto'>{children}</div>
}

BasicPageTemplate.Content = Content
