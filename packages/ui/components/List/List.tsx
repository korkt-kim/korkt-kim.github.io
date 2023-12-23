import { ComponentProps, ForwardedRef, ReactNode, forwardRef } from 'react'

import { recordValuesToString } from '../../util/recordValuesToString'

import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { ListItem } from './ListItem'

import { list } from './theme'

export interface ListProps<T> {
  data: T[]
  pagination?: boolean
  children?: ReactNode | ((item: T) => ReactNode)
}

function _List<T extends any>(
  {
    className,
    data,
    pagination,
    children,
    ...rest
  }: ListProps<T> & ComponentProps<'ul'>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const {
    styles: { base },
  } = list

  const listClasses = twMerge(
    classnames(recordValuesToString(base.list)),
    className
  )

  if (typeof children === 'function') {
    return (
      <ul {...rest} ref={ref} className={listClasses}>
        {data.map(item => children(item))}
      </ul>
    )
  }

  return (
    <ul {...rest} ref={ref} className={listClasses}>
      {children}
    </ul>
  )
}

export const List = forwardRef(_List) as unknown as (<T>(
  props: ListProps<T> &
    Omit<ComponentProps<'ul'>, 'children'> & {
      ref?: ForwardedRef<HTMLUListElement>
    }
) => ReturnType<typeof _List>) & { Item: typeof ListItem }

List.Item = ListItem

_List.displayName = 'List'
