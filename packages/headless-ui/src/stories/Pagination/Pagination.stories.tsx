import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { Pagination } from './Pagination'

const meta = {
  title: 'Example/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    defaultCurrentPage: { control: 'number' },
    siblingCount: { control: 'number' },
    count: { control: 'number' },
    pageSize: { control: 'number' },
    onChange: { action: 'clicked' },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    siblingCount: 1,
    count: 100,
    pageSize: 10,
  },
}

export const Uncontrolled: Story = {
  render: args => <Pagination {...args} />,
  args: {
    siblingCount: 1,
    count: 100,
    pageSize: 10,
    onChange: value => console.log('current page: ', value),
  },
}

export const Controlled: Story = {
  render: function Render(args) {
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onChange={currentPage => {
          console.log('current page: ', currentPage)
          setCurrentPage(currentPage)
        }}
      />
    )
  },
  args: {
    siblingCount: 1,
    count: 100,
    pageSize: 10,
    onChange: value => console.log('current page: ', value),
  },
}
