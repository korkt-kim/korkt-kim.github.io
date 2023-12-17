import { Flex, Typo } from '@zakelstorm/ui'
import Image from 'next/image'

import { Sidebar } from '@/app/components/Sidebar'
import { getArticleTotalCount } from '@/app/lib/action'
import { CATEGORIES } from '@/consts'
import Avatar from '@/public/avatar.jpeg'

export const MainSidebar = async () => {
  const res = await getArticleTotalCount()

  return (
    <Sidebar>
      <Image src={Avatar} width={100} height={100} alt='Avatar' />
      <Typo.Text>코딩하는 폴제트</Typo.Text>
      <Flex
        gap={0}
        justify='center'
        className='mt-[10px] w-full [&>div:not(:last-child)]:border-r [&>div:not(:last-child)]:border-neutral-500'>
        <ResourceCount value={res} label={'posts'} />
        <ResourceCount
          value={Array.from(CATEGORIES).length}
          label={'categories'}
        />
      </Flex>
    </Sidebar>
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
    <Flex className='px-[20px]' direction='v' align='center' gap={0}>
      <Typo.Text>{value}</Typo.Text>
      <Typo.Text>{label}</Typo.Text>
    </Flex>
  )
}
