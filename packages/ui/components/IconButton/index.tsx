import React, { ComponentProps, PropsWithChildren } from 'react'

// utils

import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

// context
import { iconButtonStyle } from './theme'
import { ButtonProps } from '../Button'
import { recordValuesToString } from '../../util/recordValuesToString'

export type IconButtonProps = ButtonProps

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps & PropsWithChildren<ComponentProps<'button'>>
>(({ variant, size, className, children, fullWidth, ...rest }, ref) => {
  // 1. init
  const { defaultProps, styles } = iconButtonStyle
  const { base, variants, sizes } = styles

  // 2. set default props
  variant = variant ?? defaultProps.variant
  size = size ?? defaultProps.size

  // 4. set styles
  const buttonBase = recordValuesToString(base)
  const buttonVariant = recordValuesToString(variants[variant])
  const buttonSize = recordValuesToString(sizes[size])
  const classes = twMerge(
    classnames(buttonBase, buttonSize, buttonVariant),
    className
  )

  // 5. return
  return (
    <button
      {...rest}
      ref={ref}
      className={classes}
      type={rest.type || 'button'}>
      <span className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
        {children}
      </span>
    </button>
  )
})

IconButton.displayName = 'IconButton'
