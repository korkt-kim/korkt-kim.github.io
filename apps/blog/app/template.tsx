import { PropsWithChildren } from 'react'

import { AppShell } from './features/layouts/AppShell'
import { MainSidebar } from './features/Sidebars/Main'

export default function Template({ children }: PropsWithChildren) {
  return (
    <AppShell>
      {children}
      <MainSidebar className='sm:hidden' />
    </AppShell>
  )
}
