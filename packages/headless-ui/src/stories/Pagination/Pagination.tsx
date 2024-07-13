import '../../styles/pagination.css'

import { forwardRef, useRef } from 'react'

import { usePagination } from '../../components/Pagination/usePagination'

export interface PaginationProps {
  /**
   * Total number of data items
   */
  count: number
  /**
   * Number of pages to show beside active page
   */
  siblingCount: number
  /**
   * Number of data items per page
   */
  pageSize: number
  /**
   * Current page number
   */
  currentPage?: number
  /**
   * Called when the page number or pageSize is changed, and it takes the resulting page number as its arguments
   */
  onChange?: (currentPage: number) => void
  /**
   * Default number of data items per page
   */
  defaultCurrentPage?: number
}

export const Pagination = forwardRef<HTMLSpanElement, PaginationProps>(
  (
    {
      currentPage,
      defaultCurrentPage,
      onChange,
      siblingCount,
      count,
      pageSize,
    },
    forwardedRef
  ) => {
    const _ref = useRef<HTMLSpanElement>(null)
    const api = usePagination({
      currentPage,
      defaultCurrentPage,
      onChange,
      siblingCount,
      count,
      pageSize,
      getRootNode: () =>
        forwardedRef && 'current' in forwardedRef
          ? forwardedRef?.current
          : _ref.current,
    })

    return (
      <>
        <nav
          {...api.getRootProps()}
          className='pagination'
          ref={forwardedRef ?? _ref}>
          <ul>
            <li>
              <a href='#previous' {...api.getLeftArrowProps()}>
                Previous <span className='visually-hidden'>Page</span>
              </a>
            </li>
            {api.pages.map((page, i) => {
              if (page.type === 'Page') {
                return (
                  <li key={page.index}>
                    <a href={`#${page.index}`} {...api.getItemProps(page)}>
                      {page.index}
                    </a>
                  </li>
                )
              } else {
                return (
                  <li key={`ellipsis-${i}`}>
                    <span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
                  </li>
                )
              }
            })}
            <li>
              <a href='#next' {...api.getRightArrowProps()}>
                Next <span className='visually-hidden'>Page</span>
              </a>
            </li>
          </ul>
        </nav>
      </>
    )
  }
)

Pagination.displayName = 'Pagination'
