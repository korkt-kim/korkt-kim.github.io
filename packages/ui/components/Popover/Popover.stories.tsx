import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { Popover, PopoverContent, PopoverHandler } from './index'
import { popoverStyle } from './theme'

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
