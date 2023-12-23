import {
  ComponentProps,
  CSSProperties,
  forwardRef,
  memo,
  PropsWithChildren,
} from 'react'
import { flexStyle } from './theme'
import { recordValuesToString } from '../../util/recordValuesToString'
import { twMerge, getDefaultConfig } from 'tailwind-merge'
import classnames from 'classnames'
import { GetTailwindVariant } from '../../util/type'

export interface FlexProps extends PropsWithChildren<ComponentProps<'div'>> {
  gap?: number
  noGap?: boolean
  inline?: boolean
  direction?: 'h' | 'v'
  justify?: GetTailwindVariant<'justify-content'>[number]
  align?: GetTailwindVariant<'align-items'>[number]
  flow?: boolean
}

export const Flex = memo(
  forwardRef<HTMLDivElement, FlexProps>(
    (
      {
        gap,
        noGap,
        inline,
        direction,
        justify,
        align,
        flow,
        className,
        ...rest
      },
      ref
    ) => {
      // 1. init
      const { defaultProps, styles } = flexStyle

      const { base, flexDirections } = styles

      // 2. set default props
      gap = gap ?? defaultProps.gap
      noGap = noGap ?? defaultProps.noGap
      inline = inline ?? defaultProps.inline
      direction = direction ?? defaultProps.direction
      justify = justify ?? defaultProps.justify
      align = align ?? defaultProps.align
      flow = flow ?? defaultProps.flow

      // 3. set style
      const flexBase = recordValuesToString(base?.initial)
      const flexDirection = recordValuesToString(flexDirections[direction])
      const flexGap = `gap-[${gap}px]`
      const flexJustify = `justify-${justify}`
      const flexAlign = `items-${align}`

      const classes = twMerge(
        classnames(
          flexBase,
          flexDirection,
          flexGap,
          flexJustify,
          flexAlign,
          {
            [recordValuesToString(base.flow)]: flow,
          },
          {
            [recordValuesToString(base.inline)]: inline,
          },
          {
            [recordValuesToString(base.noGap)]: noGap,
          }
        ),
        className
      )

      // 4. return
      return (
        <div className={classes} ref={ref} {...rest}>
          {rest.children}
        </div>
      )
    }
  )
)

if (process.env.NODE_ENV !== 'production') {
  Flex.displayName = 'Flex'
}
