import { Meta, StoryObj } from '@storybook/react'
import { spinnerStyle } from './theme'

import { Spinner } from './index'

const meta: Meta<typeof Spinner> = {
  component: Spinner,
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: spinnerStyle.defaultProps,

  render: arg => <Spinner {...arg} />,
}
