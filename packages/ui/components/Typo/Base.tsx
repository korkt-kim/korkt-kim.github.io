import React, { forwardRef } from 'react'

export interface TypographyProps<C extends keyof JSX.IntrinsicElements>
  extends React.HTMLAttributes<HTMLElement> {
  id?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  component?: C
}

interface InternalTypographyProps<C extends keyof JSX.IntrinsicElements>
  extends TypographyProps<C> {}

export const Typography = forwardRef<
  HTMLElement,
  InternalTypographyProps<keyof JSX.IntrinsicElements>
>((props, ref) => {
  const {
    component: Component = 'article',
    className,

    children,
    style,
    ...restProps
  } = props

  return (
    // @ts-expect-error: Expression produces a union type that is too complex to represent.
    <Component style={style} ref={ref} {...restProps}>
      {children}
    </Component>
  )
})

if (process.env.NODE_ENV !== 'production') {
  Typography.displayName = 'Typography'
}

// es default export should use const instead of let
export default Typography
