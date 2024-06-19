import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren } from 'react'

export const BasicPageTemplate = ({ children }: PropsWithChildren) => {
  return <Flex justify='center'>{children}</Flex>
}

const Content = ({ children }: PropsWithChildren) => {
  return (
    <div className='md:w-[calc(100%-50px)] md:max-w-1000 sm:w-full'>
      {children}
    </div>
  )
}

BasicPageTemplate.Content = Content
