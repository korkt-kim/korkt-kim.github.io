import { Meta, StoryObj } from '@storybook/react'
import { textareaStyle } from './theme'

import { Textarea } from './index'

const meta: Meta<typeof Textarea> = {
  component: Textarea,
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: { ...textareaStyle.defaultProps, label: 'Title' },

  render: arg => <Textarea {...arg} />,
}
