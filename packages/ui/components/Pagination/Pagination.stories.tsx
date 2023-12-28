import { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './index'

const meta: Meta<typeof Pagination> = {
  component: Pagination,
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: { current: 1, total: 100 },
  render: arg => <Pagination {...arg} />,
}

export const PageSize_20: Story = {
  args: { current: 1, total: 100, pageSize: 30 },
  render: arg => <Pagination {...arg} />,
}

export const sectionSize_9: Story = {
  args: { current: 1, total: 100, sectionSize: 9 },
  render: arg => <Pagination {...arg} />,
}
