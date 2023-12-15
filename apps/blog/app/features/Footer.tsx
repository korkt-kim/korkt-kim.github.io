import { Flex, Typo } from '@zakelstorm/ui'
import dayjs from 'dayjs'

import { env } from '@/env'

export function Footer() {
  return (
    <Flex justify='center' align='center'>
      <Flex align='center'>
        <Typo.Text>Product by zakelstorm</Typo.Text>
      </Flex>
      <Flex>
        <Typo.Link href={`mailto:${env('NEXT_PUBLIC_CONTACT_EMAIL')}`}>
          Contact
        </Typo.Link>
        <Typo.Text>© {dayjs().year()}, zakelstorm</Typo.Text>
      </Flex>
    </Flex>
  )
}
