import { Typo } from '@zakelstorm/ui'
import Image from 'next/image'

import { Sidebar } from '@/app/components/Sidebar'

export const MainSidebar = () => {
  return (
    <Sidebar>
      <Image src='avatar.jpeg' width={100} height={100} alt='Avatar' />
      <Typo.Text>코딩하는 폴제트</Typo.Text>
    </Sidebar>
  )
}
