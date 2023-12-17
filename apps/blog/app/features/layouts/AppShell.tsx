import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren } from 'react'

import { LAYOUT_SIDEBAR_WIDTH } from '@/app/components/Sidebar'
import { Footer } from '@/app/features/Footer'
import { Header } from '@/app/features/Header'

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`pr-[${LAYOUT_SIDEBAR_WIDTH}px] min-h-full relative pb-[100px] ml-[80px]`}>
      <Header />
      <main>{children}</main>
      <Flex
        justify='center'
        className={`absolute left-0  bottom-0 w-full min-h-[50px]`}>
        <Footer />
      </Flex>
    </div>
  )
}
