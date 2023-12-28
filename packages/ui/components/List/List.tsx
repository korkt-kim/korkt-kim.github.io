import {
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import { recordValuesToString } from '../../util/recordValuesToString'

import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

import { ListItem } from './ListItem'

import { listStyle } from './theme'
import { Pagination, PaginationProps } from '../Pagination'
import { chunk, defaults } from 'lodash-es'
import { Flex } from '../Flex'

type Placement = 'left' | 'right' | 'center'
export interface ListProps<T> {
  data: T[]
  pagination?:
    | boolean
    | (Omit<PaginationProps, 'total'> & {
        placement?: Placement
      })
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
  const { placement, current, pageSize, sectionSize } = defaults(
    typeof pagination === 'boolean' ? {} : pagination,
    {
      placement: 'center',
      current: 1,
      pageSize: 10,
      sectionSize: 5,
    }
  )

  const [currentPage, setCurrentPage] = useState(current)

  const {
    styles: { base },
  } = listStyle

  const listClasses = twMerge(
    classnames(recordValuesToString(base.list)),
    className
  )

  const onChangePagination = (index: number) => {
    if (pagination && typeof pagination !== 'boolean') {
      pagination?.onChange?.(index)
    }

    setCurrentPage(index)
  }

  if (!pagination) {
    return (
      <ul {...rest} ref={ref} className={listClasses}>
        {typeof children === 'function'
          ? data.map(item => children(item))
          : children}
      </ul>
    )
  }

  const chunkedData = chunk(data, pageSize)

  return (
    <div>
      <ul {...rest} ref={ref} className={listClasses}>
        {typeof children === 'function'
          ? chunkedData[currentPage - 1].map(item => children(item))
          : children}
      </ul>
      <Flex
        justify={
          ({ left: 'start', center: 'center', right: 'end' } as const)[
            placement as Placement
          ]
        }>
        <Pagination
          total={data.length}
          current={currentPage}
          onChange={onChangePagination}
          pageSize={pageSize}
          sectionSize={sectionSize}
        />
      </Flex>
    </div>
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
