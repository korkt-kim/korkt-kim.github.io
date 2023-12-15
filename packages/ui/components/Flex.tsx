import {
  CSSProperties,
  forwardRef,
  HTMLProps,
  memo,
  PropsWithChildren,
} from 'react'

interface ZSpaceProps {
  gap?: number
  noGap?: boolean
  inline?: boolean
  direction?: 'h' | 'v'
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  flow?: boolean
}

export const Flex = memo(
  forwardRef<
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
      const style: CSSProperties = {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: direction === 'h' ? 'row' : 'column',
        gap: noGap ? 0 : gap ?? 16,
        justifyContent: justify,
        alignItems: align,
        flexFlow: flow ? 'row-wrap' : undefined,
      }

      return (
        <div style={style} ref={forwardedRef} {...props}>
          {children}
        </div>
      )
    }
  )
)

if (process.env.NODE_ENV !== 'production') {
  Flex.displayName = 'Flex'
}
