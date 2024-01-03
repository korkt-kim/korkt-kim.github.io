import { Flex, Typo } from '@zakelstorm/ui'
import dayjs from 'dayjs'

import { env } from '@/env'

export function Footer() {
  return (
    <Flex>
      <Typo.Text>Product by zakelstorm</Typo.Text>

      <Typo.Link href={`mailto:${env('NEXT_PUBLIC_CONTACT_EMAIL')}`}>
        Contact
      </Typo.Link>
      <Typo.Text>© {dayjs().year()}, zakelstorm</Typo.Text>
    </Flex>
  )
}
