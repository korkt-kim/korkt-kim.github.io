import { defaults } from 'lodash-es'
import { useMemo } from 'react'

import { Placement, UseToastGroupProps } from './type'
import { useToastGroupMachine } from './useToastGroupMachine'
const idPrefix = 'za-toast-group'
const dataScope = 'toast'
const scopeAttr = {
  Group: {
    'data-scope': dataScope,
    'data-part': 'group',
  },
}

export const useToastGroup = (props: UseToastGroupProps) => {
  const { duration, maxCount, getRootNode, placement } = defaults(props, {})

  const { state, dispatch } = useToastGroupMachine({
    maxCount,
    duration,
    getRootNode,
  })

  return useMemo(
    () => ({
      state: {
        ...state,
        placement,
        duration,
        controller: dispatch,
      },
      getPlacements: () =>
        Array.from(
          new Set(
            state.state.toasts.map(toast => toast.placement ?? props.placement)
          )
        ),
      getGroupProps: ({
        placement,
        id,
      }: {
        placement: Placement
        id?: string
      }) => ({
        id: id ?? `${idPrefix}-${placement}`,
        ...scopeAttr.Group,
        'data-placement': placement,
        tabIndex: -1,
        onFocus: () => {
          dispatch({ type: 'PERSIST_ALL', placement })
        },
        onBlur: () => {
          dispatch({ type: 'RELEASE_PERSIST_ALL', placement })
        },
        onMouseEnter: () => {
          dispatch({ type: 'PERSIST_ALL', placement })
        },
        onMouseLeave: () => {
          dispatch({ type: 'RELEASE_PERSIST_ALL', placement })
        },
      }),
    }),
    [dispatch, duration, placement, props.placement, state]
  )
}
