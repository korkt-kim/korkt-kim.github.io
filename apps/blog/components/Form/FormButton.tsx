'use client'

import { Button, IconButton } from '@zakelstorm/ui'
import { omit } from 'lodash-es'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

export interface FormButtonProps extends ComponentProps<typeof Button> {
  isIcon?: boolean
}

export const FormButton = ({ isIcon, ...props }: FormButtonProps) => {
  const { pending } = useFormStatus()

  if (isIcon) {
    return (
      <IconButton
        disabled={pending || props.disabled}
        {...omit(props, 'disabled')}>
        {props.children}
      </IconButton>
    )
  }

  return (
    <Button
      loading={pending}
      disabled={pending || props.disabled}
      {...omit(props, 'disabled')}>
      {props.children}
    </Button>
  )
}
