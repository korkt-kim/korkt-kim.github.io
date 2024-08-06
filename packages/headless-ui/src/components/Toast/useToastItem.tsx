import { defaults } from 'lodash-es'
import { useMemo } from 'react'

import { createScope } from '../../utils/createScope'
import { useGetId } from '../../utils/utils'
import { UseToastItemProps } from './type'
import { useToastItemMachine } from './useToastItemMachine'
import { getToastItemStyle } from './util'

const idPrefix = 'zk-toast'

const dataScope = 'toast'
const scopeAttr = {
  Root: {
    'data-scope': dataScope,
    'data-part': 'root',
  },
  Title: {
    'data-scope': dataScope,
    'data-part': 'title',
  },
  Description: {
    'data-scope': dataScope,
    'data-part': 'description',
  },
  Close: {
    'data-scope': dataScope,
    'data-part': 'close-trigger',
  },
}

export const useToastItem = (props: UseToastItemProps) => {
  const getId = useGetId()

  const ids = defaults(
    props?.ids,
    getId({
      root: idPrefix,
      title: `${idPrefix}-title`,
      description: `${idPrefix}-description`,
      close: `${idPrefix}-close`,
    } as const)
  )

  const { state, dispatch } = useToastItemMachine(props)
  const dom = createScope({
    getGroupNode: () => {
      const rootNode = dom.getRootNode(props)

      return rootNode instanceof Document
        ? null
        : (rootNode as unknown as HTMLElement).closest(
            '[data-scope="toast"][data-part="group"]'
          )
    },
  })

  return useMemo(
    () => ({
      getRootProps: () => ({
        id: ids.root,
        ...scopeAttr.Root,
        'data-state': state.state,
        'data-index': props.index,
        'aria-label': state.translation.rootLabel,
        'data-type': props.type,
        style: getToastItemStyle({
          index: props.index,
          placement: props.placement,
          state: state.state,
          height: state.height,
          offset: state.offset,
          firstNodeHeight: state.firstNodeHeight,
        }),
      }),
      getTitleProps: () => ({
        id: ids.title,
        ...scopeAttr.Title,
      }),
      getDescriptionProps: () => ({
        id: ids.description,
        ...scopeAttr.Description,
      }),
      getCloseProps: () => ({
        id: ids.close,
        ...scopeAttr.Close,
        onClick: () => {
          dispatch({ type: 'CLOSE' })
        },
      }),
    }),
    [
      ids.root,
      ids.title,
      ids.description,
      ids.close,
      state.state,
      state.translation.rootLabel,
      state.height,
      state.offset,
      state.firstNodeHeight,
      props.index,
      props.type,
      props.placement,
      dispatch,
    ]
  )
}
