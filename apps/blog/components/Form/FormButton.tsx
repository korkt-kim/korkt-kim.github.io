'use client'

import { Button, IconButton } from '@zakelstorm/ui'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

type FormButtonProps = ComponentProps<typeof Button> & {
  isIcon?: boolean
}

export const FormButton = (props: FormButtonProps) => {
  const { pending } = useFormStatus()

  if (props.isIcon) {
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
