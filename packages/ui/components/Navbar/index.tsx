import React, { ComponentProps, PropsWithChildren, forwardRef } from 'react'

// utils
import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

// context
import { navbarStyle } from './theme'
import { recordValuesToString } from '../../util/recordValuesToString'
import { GetTailwindVariant } from '../../util/type'

export interface NavbarProps {
  shadow?: boolean

  fullWidth?: boolean
}

export const Navbar = forwardRef<
  HTMLDivElement,
  NavbarProps & PropsWithChildren<ComponentProps<'div'>>
>(({ shadow, fullWidth, className, children, ...rest }, ref) => {
  const {
    defaultProps,
    styles: { base },
  } = navbarStyle

  shadow = shadow ?? defaultProps.shadow

  fullWidth = fullWidth ?? defaultProps.fullWidth

  const navbarClasses = twMerge(
    classnames(recordValuesToString(base.initial), {
      [recordValuesToString(base.shadow)]: shadow,

      [recordValuesToString(base.fullWidth)]: fullWidth,
    }),
    className
  )

  // 4. return
  return (
    <nav {...rest} ref={ref} className={navbarClasses}>
      {children}
    </nav>
  )
})

Navbar.displayName = 'Navbar'
