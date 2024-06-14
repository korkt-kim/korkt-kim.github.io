import { Flex, Typo } from '@zakelstorm/ui'
import dayjs from 'dayjs'

import { CONTACT_EMAIL } from '@/consts'

export function Footer() {
  return (
    <footer>
      <Flex>
        <Typo.Text>Product by zakelstorm</Typo.Text>

        <Typo.Link href={`mailto:${CONTACT_EMAIL}`}>Contact</Typo.Link>
        <Typo.Text>© {dayjs().year()}, zakelstorm</Typo.Text>
      </Flex>
    </footer>
  )
}
