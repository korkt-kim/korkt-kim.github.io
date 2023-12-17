import { Flex, Navbar, Typo } from '@zakelstorm/ui'

import Category from '@/public/category.svg'
import Home from '@/public/home.svg'
import User from '@/public/user.svg'

export const Header = () => {
  return (
    <Flex direction='v' align='center' justify='center'>
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
        <Typo.Link href='/'>
          <div className='flex justify-center text-transparent'>
            <Home />
          </div>
          Home
        </Typo.Link>
        <Typo.Link href='/'>
          <div className='flex justify-center text-transparent'>
            <Category />
          </div>
          Category
        </Typo.Link>
        <Typo.Link href='/'>
          <div className='flex justify-center text-transparent'>
            <User />
          </div>
          User
        </Typo.Link>
      </Flex>
    </Navbar>
  )
}
