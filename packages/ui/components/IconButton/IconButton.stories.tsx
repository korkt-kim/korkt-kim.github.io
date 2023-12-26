import { Meta, StoryObj } from '@storybook/react'
import { iconButtonStyle } from './theme'

import { IconButton } from './index'

const meta: Meta<typeof IconButton> = {
  component: IconButton,
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: iconButtonStyle.defaultProps,
  render: arg => <IconButton {...arg}>asdf</IconButton>,
}
