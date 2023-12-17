import { ComponentProps, forwardRef, memo } from 'react'

import { recordValuesToString } from '../../util/recordValuesToString'

import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { ListItem, ListItemProps } from './ListItem'

import { list } from './theme'

export const _List = memo(
  forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
    ({ className, children, ...rest }, ref) => {
      const {
        styles: { base },
      } = list

      const listClasses = twMerge(
        classnames(recordValuesToString(base.list)),
        className
      )

      return (
        <ul {...rest} ref={ref} className={listClasses}>
          {children}
        </ul>
      )
    }
  )
)

_List.displayName = 'List'

export const List = { ..._List, Item: ListItem } as typeof _List & {
  Item: typeof ListItem
}
