/* eslint-disable @typescript-eslint/no-explicit-any */
import { css } from '@emotion/react'
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
    const _cssStyles = css`
      display: ${inline ? 'inline-flex' : 'flex'};
      flex-direction: ${direction === 'h' ? 'row' : 'column'};
      gap: ${noGap ? 0 : gap ?? token.paddingSM}px;
      justify-content: ${justify};
      align-items: ${align};
      ${flow &&
      css`
        flex-flow: row wrap;
      `};
      ${(props as any).css ?? ''};
    `

    return (
      <div className={className} css={_cssStyles} ref={forwardedRef} {...props}>
        {children}
      </div>
    )
  }
)

Flex.displayName = 'ZSpace'
