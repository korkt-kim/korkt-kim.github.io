import { AnchorHTMLAttributes, forwardRef, memo } from 'react'
import type { TypographyProps } from './Base'
import Base from './Base'

export interface LinkProps
  extends TypographyProps<'a'>,
    Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      'type' | keyof TypographyProps<'a'>
    > {}

export const Link = memo(
  forwardRef<HTMLElement, LinkProps>(({ rel, ...restProps }, ref) => {
    const mergedProps = {
      ...restProps,
      rel:
        rel === undefined && restProps.target === '_blank'
          ? 'noopener noreferrer'
          : rel,
    }

    return <Base {...mergedProps} ref={ref} component='a' />
  })
)
