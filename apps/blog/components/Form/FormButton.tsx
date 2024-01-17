'use client'

import { Button } from '@zakelstorm/ui'
import { ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'

type FormButtonProps = ComponentProps<typeof Button>

export const FormButton = (props: FormButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <Button loading={pending} {...props}>
      {props.children}
    </Button>
  )
}
