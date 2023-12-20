import { Flex, Typo } from '@zakelstorm/ui'

export default function NotFound() {
  return (
    <Flex direction='v' align='center' className='p-[200px]'>
      <Typo.Title>No Artcle</Typo.Title>
      <Typo.Text>
        There is invalid article in URL. Please check it again.
      </Typo.Text>
    </Flex>
  )
}
