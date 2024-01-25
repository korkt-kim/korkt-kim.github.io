import { PropsWithChildren } from 'react'

import { MainSidebar } from '@/features/Sidebars/MainSidebar'

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    <>
      {children}
      <MainSidebar />
    </>
  )
}
