import { Flex, Navbar, Typo } from '@zakelstorm/ui'
import { ReactNode } from 'react'

import Category from '@/public/category.svg'
import Home from '@/public/home.svg'
import User from '@/public/user.svg'

export const Header = () => {
  return (
    <Flex direction='v' align='center' justify='center' className='h-[200px]'>
      <Typo.Link href='/' className='bg-black text-white px-[20px]'>
        코딩하는 폴제트
      </Typo.Link>
      <Typo.Text>
        프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.
      </Typo.Text>
      <GlobalNav />
    </Flex>
  )
}

// @TODO: Link 수정
const GlobalNav = () => {
  return (
    <Navbar>
      <Flex>
        <NavIcno href='/' title='Home' Icon={<Home />} />
        <NavIcno href='/category' title='Category' Icon={<Category />} />
        <NavIcno href='/' title='User' Icon={<User />} />
      </Flex>
    </Navbar>
  )
}

const NavIcno = ({
  Icon,
  href,
  title,
}: {
  Icon: ReactNode
  href: string
  title: string
}) => {
  return (
    <Typo.Link href={href} className='text-neutral-600'>
      <div className='flex justify-center text-transparent'>{Icon}</div>
      {title}
    </Typo.Link>
  )
}
