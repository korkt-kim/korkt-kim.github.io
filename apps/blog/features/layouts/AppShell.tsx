import { Flex } from '@zakelstorm/ui'
import { PropsWithChildren } from 'react'

import { Footer } from '@/features/Footer'
import { Header } from '@/features/Header'

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={`md:pr-[var(--sidebar-width)] sm:mx-[10px] min-h-full relative pb-150 md:ml-80 `}>
      <Header />
      <main>{children}</main>
      <Flex
        justify='center'
        className={`absolute left-0  bottom-0 md:pr-[var(--sidebar-width)] w-full min-h-50`}>
        <Footer />
      </Flex>
    </div>
  )
}
