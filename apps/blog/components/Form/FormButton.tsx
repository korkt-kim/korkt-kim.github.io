'use client'

import { Button, IconButton } from '@zakelstorm/ui'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

export interface FormButtonProps extends ComponentProps<typeof Button> {
  isIcon?: boolean
}

export const FormButton = ({ isIcon, ...props }: FormButtonProps) => {
  const { pending } = useFormStatus()

  if (isIcon) {
    return (
      <IconButton disabled={pending} {...props}>
        {props.children}
      </IconButton>
    )
  }

  return (
    <Button loading={pending} {...props}>
      {props.children}
    </Button>
  )
}
