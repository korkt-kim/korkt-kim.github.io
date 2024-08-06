import { merge } from 'lodash-es'
import { useCallback, useEffect, useReducer, useRef, useState } from 'react'

import { useDeepEffect } from '../../hooks/useDeepEffect'
import { useMutationObserver } from '../../hooks/useMutationObserver'
import { useResizeObserver } from '../../hooks/useResizeObserver'
import { createScope } from '../../utils/createScope'
import { getStyleProperty, isInState as _isInState } from '../../utils/utils'
import { ToastItemState, Translation, UseToastItemProps } from './type'

type Context = object

const DEFAILT_TRANSLATION: Translation = {
  rootLabel: 'Toast',
  closeLabel: 'Close Toast',
}

export type UseToastMachineProps = UseToastItemProps

const isInState = _isInState<ToastItemState>()

export const useToastItemMachine = (props: UseToastMachineProps) => {
  const dom = createScope({
    getRootEl: () => {
      const rootNode = dom.getRootNode(props)

      return (
        rootNode instanceof Document
          ? rootNode?.querySelector(
              `[data-scope="toast"][data-part="root"][data-index="${props.index}"]`
            )
          : rootNode
      ) as HTMLElement | undefined
    },

    getRootsEl: () => {
      const rootNode = dom.getRootNode(props)
      const groupEl =
        rootNode instanceof Document
          ? null
          : (rootNode as unknown as HTMLElement).closest(
              '[data-scope="toast"][data-part="group"]'
            )
      return Array.from(
        groupEl?.querySelectorAll('[data-scope="toast"][data-part="root"]') ??
          []
      )
    },

    getGroupNode: () => {
      const rootNode = dom.getRootNode(props)

      return rootNode instanceof Document
        ? null
        : (rootNode as unknown as HTMLElement).closest(
            '[data-scope="toast"][data-part="group"]'
          )
    },
  })
  const [state, changeState] = useState<ToastItemState>('updating')

  const getComputedState = useCallback(
    (context: Context) => {
      return {
        translation: merge(DEFAILT_TRANSLATION, props.translation),
      }
    },
    [props.translation]
  )

  const reducer = useCallback(
    (
      ctx: Context,
      action: { type: 'CLOSE' } | { type: 'HOVER' } | { type: 'LEAVE' }
    ) => {
      switch (action.type) {
        case 'CLOSE': {
          // @TODO 200ms
          setTimeout(() => {
            props.controller({ type: 'CLOSE', id: props.toastId })
          }, 200)
          changeState('unmounted')

          return { ...ctx }
        }

        default:
          return { ...ctx }
      }
    },
    [props]
  )

  const [context, dispatch] = useReducer(reducer, {})

  // computed
  const { translation } = getComputedState(context)
  const [height, setHeight] = useState(0)
  const [offset, setOffset] = useState(0)
  const [firstNodeHeight, setFirstNodeHeight] = useState(0)

  // watch
  useEffect(() => {
    if (height > 0 && isInState(['updating'], state)) {
      changeState('visible')
    }
  }, [height, state])

  useResizeObserver(
    () => dom.getRootEl() as HTMLElement,
    entries => {
      setHeight(entries[0].borderBoxSize[0].blockSize)
    },
    [dom, height],
    height === 0
  )

  // delay <-- Not Event Driven. Time Driven
  const timer = useRef<number | null>(null)
  const remainingTime = useRef(props.duration ?? props.defaultDuration)
  const startedTime = useRef(0)

  useDeepEffect(() => {
    if (height <= 0) {
      return
    }

    if (props.persistingPlacements.includes(props.placement)) {
      if (typeof timer.current !== 'number') {
        return
      }
      changeState('persisting')

      remainingTime.current =
        remainingTime.current - (Date.now() - startedTime.current)
      window.clearTimeout(timer.current)
      timer.current = null

      return
    }

    startedTime.current = Date.now()

    changeState('visible')

    timer.current = window.setTimeout(() => {
      // @TODO 200ms 변수로받게
      setTimeout(() => {
        props.controller({ type: 'CLOSE', id: props.toastId })
      }, 200)

      changeState('unmounted')
    }, remainingTime.current)

    return () => {
      if (typeof timer.current !== 'number') {
        return
      }

      window.clearTimeout(timer.current)
    }
  }, [props.toastId, props.persistingPlacements, props.placement, height])

  useMutationObserver(
    dom.getGroupNode() as HTMLElement,
    mutations => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-state'
        ) {
          const target = mutation.target as HTMLElement

          const initialHeight = Number(
            getStyleProperty(target, '--initialHeight')
          )

          const targetIndex = Number(getStyleProperty(target, '--index'))

          if (targetIndex === 0) {
            setFirstNodeHeight(initialHeight)
          }
        }
      }
      let offset = 0
      const rootNodes = dom.getRootsEl()
      rootNodes.forEach(rootNode => {
        const initialHeight = Number(
          getStyleProperty(rootNode, '--initialHeight')
        )
        const index = Number(rootNode.getAttribute('data-index'))

        if (props.index > index) {
          offset += initialHeight
        }
      })

      setOffset(offset)
    },
    {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: false,
    }
  )

  return {
    state: {
      state,
      ...context,
      height,
      offset,
      firstNodeHeight,
      translation,
    },
    dispatch,
  }
}
