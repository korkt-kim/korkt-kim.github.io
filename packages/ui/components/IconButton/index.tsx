// utils
import classnames from 'classnames'
import { ComponentProps, forwardRef, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

import { recordValuesToString } from '../../util/recordValuesToString'
import { ButtonProps } from '../Button'
// context
import { iconButtonStyle } from './theme'

export type IconButtonProps = Omit<ButtonProps, 'loading' | 'fullWidth'>

export const IconButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps & PropsWithChildren<ComponentProps<'button'>>
>(({ variant, size, className, children, ...rest }, ref) => {
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
