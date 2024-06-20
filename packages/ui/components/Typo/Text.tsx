import { forwardRef, HTMLAttributes, memo } from 'react'

import type { TypographyProps } from './Base'
import { Typography as Base } from './Base'

export interface TextProps
  extends TypographyProps<'span'>,
    Omit<
      HTMLAttributes<HTMLSpanElement>,
      'type' | keyof TypographyProps<'span'>
    > {}

export const Text = memo(
  forwardRef<HTMLSpanElement, TextProps>((textProps, ref) => {
    return <Base ref={ref} {...textProps} component='p' />
  })
)
