import { Meta, StoryObj } from '@storybook/react'
import { popoverStyle } from './theme'

import { Popover, PopoverContent, PopoverHandler } from './index'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  component: Popover,
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: popoverStyle.defaultProps,

  render: arg => {
    return (
      <Popover>
        <PopoverHandler>
          <Button>Popover</Button>
        </PopoverHandler>
        <PopoverContent>
          This is a very beautiful popover, show some love.
        </PopoverContent>
      </Popover>
    )
  },
}
