import { Meta, StoryObj } from '@storybook/react'
import { buttonStyle } from './theme'

import { Button } from './index'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: buttonStyle.defaultProps,
  render: arg => <Button {...arg}>Primary</Button>,
}
