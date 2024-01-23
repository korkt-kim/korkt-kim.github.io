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
  gap?: 'sm' | 'md' | 'lg'
  noGap?: boolean
  inline?: boolean
  direction?: 'h' | 'v'
  justify?: GetTailwindVariant<'justify-content'>[number]
  align?: GetTailwindVariant<'align-items'>[number]
  wrap?: boolean
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
        wrap,
        className,
        ...rest
      },
      ref
    ) => {
      // 1. init
      const { defaultProps, styles } = flexStyle

      const { base, flexDirections, gaps, justifyContents, alignItems } = styles

      // 2. set default props
      gap = gap ?? defaultProps.gap
      noGap = noGap ?? defaultProps.noGap
      inline = inline ?? defaultProps.inline
      direction = direction ?? defaultProps.direction
      justify = justify ?? defaultProps.justify
      align = align ?? defaultProps.align
      wrap = wrap ?? defaultProps.wrap

      const classes = twMerge(
        classnames(
          recordValuesToString(base?.initial),
          recordValuesToString(flexDirections[direction]),
          recordValuesToString(gaps[gap]),
          recordValuesToString(justifyContents[justify]),
          recordValuesToString(alignItems[align]),
          { [recordValuesToString(base.wrap)]: wrap },
          { [recordValuesToString(base.inline)]: inline },
          { [recordValuesToString(base.noGap)]: noGap }
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

Flex.displayName = 'Flex'
