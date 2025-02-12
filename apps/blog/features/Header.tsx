import { Flex, Navbar, Typo } from '@zakelstorm/ui'
import { m } from 'framer-motion'
import { Route } from 'next'
import Link from 'next/link'
import { ReactNode } from 'react'

import Category from '@/public/category.svg'
import Home from '@/public/home.svg'
import User from '@/public/user.svg'

export const Header = () => {
  return (
    <header>
      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Flex direction='v' align='center' justify='center' className='h-200'>
          <Typo.Title level={1} className='bg-black text-white px-20'>
            코딩하는 폴제트
          </Typo.Title>
          <Typo.Text>
            프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.
          </Typo.Text>
          <GlobalNav />
        </Flex>
      </m.div>
    </header>
  )
}

// @TODO: Link 수정
const GlobalNav = () => {
  return (
    <Navbar>
      <Flex>
        <NavIcon href='/' title='Home' Icon={<Home />} />
        <NavIcon href='/category' title='Category' Icon={<Category />} />
        <NavIcon href='/about' title='About' Icon={<User />} />
      </Flex>
    </Navbar>
  )
}

const NavIcon = ({
  Icon,
  href,
  title,
}: {
  Icon: ReactNode
  href: Route
  title: string
}) => {
  return (
    <Link href={href} className='text-neutral-600' prefetch={false}>
      <div className='flex justify-center text-transparent'>{Icon}</div>
      {title}
    </Link>
  )
}
