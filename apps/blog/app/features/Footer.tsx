import { css } from '@emotion/react'
import { Flex, Typo, useToken } from '@zakelstorm/ui'
import dayjs from 'dayjs'

import { env } from '@/env'

export function Footer() {
  const { token } = useToken()
  return (
    <Flex justify='center' align='center' gap={token.paddingLG}>
      <Flex align='center'>
        <Typo.Text>Product by zakelstorm</Typo.Text>
      </Flex>
      <Flex
        gap={token.paddingLG}
        css={css`
          a {
            color: ${token.colorText};
          }
        `}>
        <Typo.Link href={`mailto:${env('NEXT_PUBLIC_CONTACT_EMAIL')}`}>
          Contact
        </Typo.Link>
        <Typo.Text>© {dayjs().year()}, zakelstorm</Typo.Text>
      </Flex>
    </Flex>
  )
}