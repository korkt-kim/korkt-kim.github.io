import { Meta, StoryObj } from '@storybook/react'

import { Button } from './index'
import { buttonStyle } from './theme'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: buttonStyle.defaultProps,
  render: arg => <Button {...arg}>Primary</Button>,
}
