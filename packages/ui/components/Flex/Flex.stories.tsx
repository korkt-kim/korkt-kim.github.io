import { Meta, StoryObj } from '@storybook/react'
import { flexStyle } from './theme'

import { Flex } from './index'

const meta: Meta<typeof Flex> = {
  component: Flex,
}

export default meta
type Story = StoryObj<typeof Flex>

export const Default: Story = {
  args: flexStyle.defaultProps,

  render: arg => (
    <>
      <Flex {...arg}>
        <div>Inside Flex1</div>
        <div>Inside Flex2</div>
        <div>Inside Flex3</div>
      </Flex>
      <span>This is Outside Flex</span>
    </>
  ),
}

export const Wrap: Story = {
  args: { ...flexStyle.defaultProps, wrap: true },

  render: arg => (
    <div className='w-[200px]'>
      <Flex {...arg}>
        <div>Inside Flex1</div>
        <div>Inside Flex2</div>
        <div>Inside Flex3</div>
      </Flex>
    </div>
  ),
}
