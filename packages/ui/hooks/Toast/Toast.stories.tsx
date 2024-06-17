import { Meta } from '@storybook/react'

import { Button } from '../../components/Button/index'
import { ToastCtx } from './ToastCtx'
import { useToast } from './useToast'

const meta: Meta = {
  component: () => null,
}

export default meta

export const Default = {
  render: () => {
    return (
      <>
        <OpenToastButton />
        <ToastCtx />
      </>
    )
  },
}

const OpenToastButton = () => {
  const { toast } = useToast()

  return (
    <Button
      onClick={() =>
        toast({
          title: 'Text',
          description:
            'This is Test Toast.This is Test Toast.This is Test ToastThis is Test Toast',
        })
      }>
      Open Toast
    </Button>
  )
}
