import { CSSProperties, forwardRef, HTMLProps, PropsWithChildren } from 'react'

import { useToken } from '../hooks/useToken'

interface ZSpaceProps {
  gap?: number
  noGap?: boolean
  inline?: boolean
  direction?: 'h' | 'v'
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  flow?: boolean
}

export const Flex = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ZSpaceProps> & HTMLProps<HTMLDivElement>
>(
  (
    {
      gap,
      noGap = false,
      inline = false,
      direction = 'h',
      justify = 'flex-start',
      align = 'normal',
      flow = false,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const { token } = useToken()

    const className = `_z-space${props.className ? ` ${props.className}` : ''}`
    const _cssStyles: CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction === 'h' ? 'row' : 'column',
      gap: noGap ? 0 : gap ?? token.paddingSM,
      justifyContent: justify,
      alignItems: align,
      flexFlow: flow ? 'row-wrap' : undefined,
    }

    return (
      <div
        className='text-3xl'
        style={_cssStyles}
        ref={forwardedRef}
        {...props}>
        {children}
      </div>
    )
  }
)

Flex.displayName = 'Flex'
