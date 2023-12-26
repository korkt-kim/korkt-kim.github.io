import { Meta, StoryObj } from '@storybook/react'
import { navbarStyle } from './theme'

import { Navbar } from './index'
import { Flex } from '../Flex'

const meta: Meta<typeof Navbar> = {
  component: Navbar,
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: navbarStyle.defaultProps,

  render: arg => (
    <Navbar {...arg}>
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </Navbar>
  ),
}

export const FullWidth: Story = {
  args: { ...navbarStyle.defaultProps, fullWidth: true },

  render: arg => (
    <Flex>
      <Navbar {...arg}>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </Navbar>
      <div>outside navbar</div>
    </Flex>
  ),
}
