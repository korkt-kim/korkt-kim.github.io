import { Flex, Typo } from '@zakelstorm/ui'
import dayjs from 'dayjs'

import { CONTACT_EMAIL, MY_GITHUB_REPO } from '@/consts'
import Email from '@/public/email.svg'
import GitHub from '@/public/github.svg'

export function Footer() {
  return (
    <footer className='absolute left-0  bottom-0  w-full h-150'>
      <Flex
        direction='v'
        align='center'
        gap='sm'
        className='h-full'
        justify='center'>
        <Flex className='text-24 '>
          <Typo.Link
            aria-label='Github'
            className='text-gray-500 hover:text-black'
            href={MY_GITHUB_REPO}
            target='_blank'>
            <GitHub />
          </Typo.Link>
          <Typo.Link
            aria-label='Contact'
            className='text-gray-500 hover:text-black'
            href={`mailto:${CONTACT_EMAIL}`}>
            <Email />
          </Typo.Link>
        </Flex>
        <Flex>
          <Typo.Text className='text-14'>
            © {dayjs().year()}, zakelstorm blog Powered By NextJS
          </Typo.Text>
        </Flex>
      </Flex>
    </footer>
  )
}
