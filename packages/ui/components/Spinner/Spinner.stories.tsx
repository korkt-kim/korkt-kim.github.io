import { Meta, StoryObj } from '@storybook/react'

import { Spinner } from './index'
import { spinnerStyle } from './theme'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: spinnerStyle.defaultProps,

  render: arg => <Spinner {...arg} />,
}
