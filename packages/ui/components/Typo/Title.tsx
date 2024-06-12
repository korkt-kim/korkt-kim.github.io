import { forwardRef, HTMLAttributes, memo } from 'react'

import type { TypographyProps } from './Base'
import { Typography as Base } from './Base'

const TITLE_ELE_LIST = [1, 2, 3, 4, 5] as const

export interface TitleProps
  extends Omit<TypographyProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>, 'strong'>,
    Omit<
      HTMLAttributes<HTMLHeadElement>,
      'type' | keyof TypographyProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
    > {
  level?: (typeof TITLE_ELE_LIST)[number]
}

export const Title = memo(
  forwardRef<HTMLElement, TitleProps>((props, ref) => {
    const { level = 1, ...restProps } = props
    let component: keyof JSX.IntrinsicElements

    if (TITLE_ELE_LIST.includes(level)) {
      component = `h${level}`
    } else {
      component = 'h1'
    }

    return <Base ref={ref} {...restProps} component={component} />
  })
)
