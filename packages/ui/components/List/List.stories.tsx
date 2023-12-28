import { Meta, StoryObj } from '@storybook/react'
import { listStyle } from './theme'

import { List } from './index'

const meta: Meta<typeof List> = {
  component: List,
}

export default meta
type Story = StoryObj<typeof List>

export const Default: Story = {
  args: listStyle.defaultProps,

  render: arg => (
    <>
      <List data={['a', 'b', 'c'].map(item => ({ name: item }))}>
        {item => <List.Item>{item.name}</List.Item>}
      </List>
    </>
  ),
}

export const WithPagination: Story = {
  args: { ...listStyle.defaultProps, pagination: true },

  render: arg => (
    <>
      <List
        pagination
        data={Array(101)
          .fill(null)
          .map((_, index) => ({ name: index }))}>
        {item => <List.Item>{item.name}</List.Item>}
      </List>
    </>
  ),
}
