import classnames from 'classnames'
import { chunk, defaults, isEmpty } from 'lodash-es'
import {
  ComponentProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'

import { recordValuesToString } from '../../util/recordValuesToString'
import { Flex } from '../Flex'
import { Pagination, PaginationProps } from '../Pagination'
import { ListItem } from './ListItem'
import { listStyle } from './theme'

type Placement = 'left' | 'right' | 'center'
export interface ListProps<T> {
  data: T[]
  pagination?:
    | boolean
    | (Partial<Omit<PaginationProps, 'total'>> & {
        placement?: Placement
      })
  children?: ReactNode | ((item: T) => ReactNode)
}

function _List<T>(
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
      pageSize: 10,
      sectionSize: 5,
    }
  )

  const [currentPage, setCurrentPage] = useState(1)

  const {
    styles: { base },
  } = listStyle

  useEffect(() => {
    if (typeof current === 'undefined') {
      return
    }

    setCurrentPage(current)
  }, [current])

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

  if (!pagination || isEmpty(data)) {
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
          ? chunkedData[
              Math.min(current ?? currentPage, chunkedData.length) - 1
            ].map(item => children(item))
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
          current={Math.min(current ?? currentPage, chunkedData.length)}
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
