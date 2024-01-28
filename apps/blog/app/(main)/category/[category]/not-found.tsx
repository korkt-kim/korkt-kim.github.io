import { Flex, Typo } from '@zakelstorm/ui'

export default function NotFound() {
  return (
    <Flex direction='v' align='center' className='py-200'>
      <Typo.Title>No Category</Typo.Title>
      <Typo.Text>
        There is invalid category in URL. Please check it again.
      </Typo.Text>
    </Flex>
  )
}
