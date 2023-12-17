import { Typo } from '@zakelstorm/ui'
import Image from 'next/image'

import { Sidebar } from '@/app/components/Sidebar'
import Avatar from '@/public/avatar.jpeg'

export const MainSidebar = () => {
  return (
    <Sidebar>
      <Image src={Avatar} width={100} height={100} alt='Avatar' />
      <Typo.Text>코딩하는 폴제트</Typo.Text>
    </Sidebar>
  )
}
