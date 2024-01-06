import { PropsWithChildren } from 'react'

import { MainSidebar } from '@/features/Sidebars/Main'

export default function Template({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <MainSidebar className='sm:hidden' />
    </>
  )
}
