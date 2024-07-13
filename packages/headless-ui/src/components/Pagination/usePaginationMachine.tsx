import { useCallback, useEffect, useMemo, useReducer } from 'react'

import { createScope } from '../../utils/createScope'
import { isInState as _isInState } from '../../utils/utils'
import { UsePaginationProps } from './type'

interface Context {
  currentPage: number
}

const DEFAULT_CURRENT_PAGE = 1

export type UsePaginationMachineProps = UsePaginationProps

export const usePaginationMachine = (props: UsePaginationMachineProps) => {
  const dom = createScope({
    getItems: () => {
      return dom
        .getRootNode(props)
        .querySelectorAll<HTMLInputElement>(
          'input[data-scope="pagination"][data-part="item"]'
        )
    },
  })

  const lastPage = useMemo(() => {
    return Math.ceil(props.count / props.pageSize)
  }, [props.count, props.pageSize])

  const getComputedState = useCallback(
    (context: Context) => {
      const currentPage = props.currentPage ?? context.currentPage

      const minPage = Math.max(
        1,
        Math.min(
          currentPage - props.siblingCount,
          lastPage - props.siblingCount * 2
        )
      )
      const showLeftEllipsis = minPage > 2
      const maxPage = Math.min(lastPage, minPage + props.siblingCount * 2)
      const showRightEllipsis = maxPage < lastPage - 1

      const items = [
        ...new Array(maxPage - minPage + 1).fill(null).map(
          (_, index) =>
            ({
              type: 'Page',
              index: minPage + index,
            }) as const
        ),
      ] as const

      const pages: { type: 'Page' | 'Ellipsis'; index: number }[] = []

      if (!items.some(item => item.type === 'Page' && item.index === 1)) {
        pages.push({ type: 'Page', index: 1 })
      }

      if (showLeftEllipsis) {
        pages.push({ type: 'Ellipsis', index: 0 })
      }

      pages.push(...items)

      if (showRightEllipsis) {
        pages.push({ type: 'Ellipsis', index: 1 })
      }

      if (
        !items.some(item => item.type === 'Page' && item.index === lastPage)
      ) {
        pages.push({ type: 'Page', index: lastPage })
      }

      return {
        rightArrowDisabled: currentPage === lastPage,
        leftArrowDisabled: currentPage === 1,
        currentPage,
        pages,
      }
    },
    [lastPage, props.currentPage, props.siblingCount]
  )

  const reducer = useCallback(
    (
      ctx: Context,
      action:
        | { type: 'SET_CURRENTPAGE'; page: number; isTrusted?: boolean }
        | { type: 'PREV' }
        | { type: 'NEXT' }
    ) => {
      const { leftArrowDisabled, rightArrowDisabled, currentPage } =
        getComputedState(ctx)

      switch (action.type) {
        // action
        case 'PREV': {
          // guard
          if (leftArrowDisabled) {
            return { ...ctx }
          }

          //logic
          const newCurrentPage = currentPage - 1

          return { ...ctx, currentPage: newCurrentPage }
        }

        case 'NEXT': {
          //guard
          if (rightArrowDisabled) {
            return { ...ctx }
          }

          //logic
          const newCurrentPage = currentPage + 1

          return { ...ctx, currentPage: newCurrentPage }
        }

        case 'SET_CURRENTPAGE': {
          //guard
          if (action.isTrusted && (action.page < 1 || action.page > lastPage)) {
            return { ...ctx }
          }

          //logic
          return { ...ctx, currentPage: action.page }
        }

        default:
          return { ...ctx }
      }
    },
    [getComputedState, lastPage, props]
  )

  const [context, dispatch] = useReducer(reducer, {
    currentPage:
      props.currentPage ?? props.defaultCurrentPage ?? DEFAULT_CURRENT_PAGE,
  })

  // computed
  const { leftArrowDisabled, rightArrowDisabled, currentPage, pages } =
    getComputedState(context)

  // watch
  useEffect(() => {
    props.onChange?.(context.currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.currentPage])

  return {
    state: {
      ...context,
      leftArrowDisabled,
      rightArrowDisabled,
      currentPage,
      pages,
    },
    dispatch,
  }
}
