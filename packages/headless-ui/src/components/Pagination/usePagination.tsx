import { defaults } from 'lodash-es'
import { useMemo } from 'react'

import { getId } from '../../utils/utils'
import { UsePaginationProps } from './type'
import { usePaginationMachine } from './usePaginationMachine'

const idPrefix = 'zk-pininput-'

const dataScope = 'pagination'
const scopeAttr = {
  Root: {
    'data-scope': dataScope,
    'data-part': 'root',
  },
  LeftArrow: {
    'data-scope': dataScope,
    'data-part': 'arrow-left',
  },
  RightArrow: {
    'data-scope': dataScope,
    'data-part': 'arrow-right',
  },
  Item: {
    'data-scope': dataScope,
    'data-part': 'item',
  },
  Ellipsis: {
    'data-scope': dataScope,
    'data-part': 'ellipsis',
  },
}

const defaultIds = {
  rootId: getId(idPrefix),
  leftArrowId: getId(`${idPrefix}-arrow-left`),
  rightArrowId: getId(`${idPrefix}-arrow-right`),
  itemId: (index: number) => getId(`${idPrefix}-item-${index}`),
  ellipsis: (index: number) => getId(`${idPrefix}-ellipsis-${index}`),
}

export const usePagination = (props: UsePaginationProps) => {
  const ids = defaults(props?.ids, defaultIds)

  const { state, dispatch } = usePaginationMachine(props)

  return useMemo(
    () => ({
      pages: state.pages,
      currentPage: state.currentPage,
      getRootProps: () => ({
        id: ids.rootId,
        ...scopeAttr.Root,
      }),
      getLeftArrowProps: () => ({
        id: ids.leftArrowId,
        ...scopeAttr.LeftArrow,
        disabled: state.leftArrowDisabled,
        onClick: () => {
          dispatch({ type: 'PREV' })
        },
      }),
      getRightArrowProps: () => ({
        id: ids.rightArrowId,
        ...scopeAttr.RightArrow,
        disabled: state.rightArrowDisabled,
        onClick: () => {
          dispatch({ type: 'NEXT' })
        },
      }),
      getEllipsisProps: ({ index }: { index: number }) => ({
        id: ids.itemId(index),
      }),
      getItemProps: ({ index }: { index: number }) => {
        return {
          id: defaultIds.itemId(index),
          onClick: () => {
            dispatch({
              type: 'SET_CURRENTPAGE',
              page: index,
              isTrusted: true,
            })
            return
          },
          ...scopeAttr.Item,

          'data-selected': index === state.currentPage ? true : undefined,
        }
      },
    }),
    [
      dispatch,
      ids,
      state.currentPage,
      state.leftArrowDisabled,
      state.pages,
      state.rightArrowDisabled,
    ]
  )
}
