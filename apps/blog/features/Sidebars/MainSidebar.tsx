import { Flex, Typo } from '@zakelstorm/ui'
import Image from 'next/image'

import { getArticleTotalCount } from '@/action/article'
import { CATEGORIES } from '@/consts'
import Avatar from '@/public/avatar.jpeg'

import { SidebarWrapper } from './SidebarWrapper'

export const MainSidebar = async () => {
  const res = await getArticleTotalCount()

  return (
    <SidebarWrapper>
      <Flex direction='v' align='center'>
        <Image
          src={Avatar}
          width={100}
          height={100}
          alt='Avatar'
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Typo.Text>코딩하는 폴제트</Typo.Text>
        <Flex
          noGap
          justify='center'
          className='mt-10 w-full [&>div:not(:last-child)]:border-r [&>div:not(:last-child)]:border-neutral-500'>
          <ResourceCount value={res} label={'posts'} />
          <ResourceCount
            value={Array.from(CATEGORIES).length}
            label={'categories'}
          />
        </Flex>
      </Flex>
    </SidebarWrapper>
  )
}

const ResourceCount = ({
  value,
  label,
}: {
  value: string | number
  label: string
}) => {
  return (
    <Flex className='px-20' direction='v' align='center' noGap>
      <Typo.Text>{value}</Typo.Text>
      <Typo.Text>{label}</Typo.Text>
    </Flex>
  )
}
