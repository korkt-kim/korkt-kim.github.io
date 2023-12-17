import React, { ComponentProps, PropsWithChildren, forwardRef } from 'react'

// utils
import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

// context
import { navbar } from './theme'
import { recordValuesToString } from '../../util/recordValuesToString'
import { GetTailwindVariant } from '../../util/type'

export interface NavbarProps {
  direction?: 'h' | 'v'
  justify?: GetTailwindVariant<'justify-content'>[number]
  align?: GetTailwindVariant<'align-items'>[number]
  shadow?: boolean
  blurred?: boolean
  fullWidth?: boolean
}

export const Navbar = forwardRef<
  HTMLDivElement,
  NavbarProps & PropsWithChildren<ComponentProps<'div'>>
>(({ shadow, blurred, fullWidth, className, children, ...rest }, ref) => {
  const {
    defaultProps,
    styles: { base, directions },
  } = navbar

  shadow = shadow ?? defaultProps.shadow
  blurred = blurred ?? defaultProps.blurred
  fullWidth = fullWidth ?? defaultProps.fullWidth

  const navbarRoot = classnames(recordValuesToString(base.navbar.initial), {
    [recordValuesToString(base.navbar.shadow)]: shadow,
    [recordValuesToString(base.navbar.blurred)]: blurred,
    [recordValuesToString(base.navbar.fullWidth)]: fullWidth,
  })

  const navbarClasses = twMerge(navbarRoot, className)

  // 4. return
  return (
    <nav {...rest} ref={ref} className={navbarClasses}>
      {children}
    </nav>
  )
})

Navbar.displayName = 'Navbar'
