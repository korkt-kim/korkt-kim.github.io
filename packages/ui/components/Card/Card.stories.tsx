import { Meta, StoryObj } from '@storybook/react'

import { Card } from './index'

const meta: Meta<typeof Card> = {
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: { title: 'Title' },
  render: arg => <Card {...arg}>asdf</Card>,
}
