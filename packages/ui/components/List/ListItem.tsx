import { ComponentProps, forwardRef } from 'react'

import { list } from './theme'

import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { recordValuesToString } from '../../util/recordValuesToString'

export interface ListItemProps {
  disabled?: boolean
  selected?: boolean
}

export const ListItem = forwardRef<
  HTMLLIElement,
  ListItemProps & ComponentProps<'li'>
>(({ className, disabled, selected, children, ...rest }, ref) => {
  const {
    defaultProps,
    styles: { base },
  } = list

  const listItemClasses = twMerge(
    classnames(recordValuesToString(base.item.initial), {
      [recordValuesToString(base.item.disabled)]: disabled,
      [recordValuesToString(base.item.selected)]: selected && !disabled,
    }),
    className
  )

  return (
    <li ref={ref} tabIndex={0} className={listItemClasses} {...rest}>
      {children}
    </li>
  )
})

ListItem.displayName = 'ListItem'
