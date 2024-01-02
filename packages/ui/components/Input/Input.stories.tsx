import { Meta, StoryObj } from '@storybook/react'
import { inputStyle } from './theme'

import { Input } from './index'

const meta: Meta<typeof Input> = {
  component: Input,
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { ...inputStyle.defaultProps, label: 'label' },
  render: arg => <Input {...arg} />,
}
