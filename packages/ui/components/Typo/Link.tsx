import { forwardRef } from 'react'
import type { TypographyProps } from './Base'
import Base from './Base'

export interface LinkProps
  extends TypographyProps<'a'>,
    Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      'type' | keyof TypographyProps<'a'>
    > {}

export const Link = forwardRef<HTMLElement, LinkProps>(
  ({ rel, ...restProps }, ref) => {
    const mergedProps = {
      ...restProps,
      rel:
        rel === undefined && restProps.target === '_blank'
          ? 'noopener noreferrer'
          : rel,
    }

    return <Base {...mergedProps} ref={ref} component='a' />
  }
)
