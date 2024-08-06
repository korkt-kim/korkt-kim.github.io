import type { Meta, StoryObj } from '@storybook/react'

import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

const ToastCreator = (
  props: Parameters<ReturnType<typeof useToast>['open']>[0]
) => {
  const toastController = useToast()

  return (
    <>
      <button onClick={() => toastController.open(props)}>Open Toast</button>
    </>
  )
}

const meta: Meta<typeof ToastCreator> = {
  title: 'Example/Toast',
  component: ToastCreator,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ToastProvider duration={500000} maxCount={10} placement='bottom'>
        <Story />
      </ToastProvider>
    ),
  ],

  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['error', 'success', 'info', 'loading', 'custom'],
      control: {
        type: 'radio',
      },
    },
    duration: { control: 'number' },
    title: { control: 'text' },
    description: { control: 'text' },
    placement: {
      options: [
        'top-left',
        'top',
        'top-right',
        'bottom-left',
        'bottom',
        'bottom-right',
      ],
      control: {
        type: 'radio',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    duration: 1000,
    description: 'Description',
    placement: 'bottom',
  },
}
