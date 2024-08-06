import { uniqueId } from 'lodash-es'
import { useCallback, useReducer, useState } from 'react'

import { useMutationObserver } from '../../hooks/useMutationObserver'
import { createScope } from '../../utils/createScope'
import { getStyleProperty } from '../../utils/utils'
import {
  Placement,
  ToastController,
  ToastItemOption,
  UseToastGroupProps,
} from './type'

export interface Context {
  toasts: ToastItemOption[]
  persistingPlacements: Placement[]
}

export type UseToastGroupMachineProps = Pick<
  UseToastGroupProps,
  'maxCount' | 'duration' | 'getRootNode'
>

const generateToastId = () => {
  return `Toast-${uniqueId()}`
}

export const useToastGroupMachine = (props: UseToastGroupMachineProps) => {
  const dom = createScope()

  const reducer = useCallback(
    (ctx: Context, action: ToastController) => {
      switch (action.type) {
        case 'CLOSE': {
          return {
            ...ctx,
            toasts: ctx.toasts.filter(item => item.id !== action.id),
          }
        }

        case 'OPEN': {
          const id = generateToastId()

          return {
            ...ctx,
            toasts: [{ id, ...action.option }, ...ctx.toasts].slice(
              0,
              Math.min(props.maxCount, ctx.toasts.length + 1)
            ),
          }
        }

        case 'PERSIST_ALL': {
          return {
            ...ctx,
            persistingPlacements: Array.from(
              new Set([...ctx.persistingPlacements, action.placement])
            ),
          }
        }

        case 'RELEASE_PERSIST_ALL': {
          return {
            ...ctx,
            persistingPlacements: ctx.persistingPlacements.filter(
              item => item !== action.placement
            ),
          }
        }

        default:
          return { ...ctx }
      }
    },
    [props.maxCount]
  )

  const [state, dispatch] = useReducer(reducer, {
    toasts: [],
    persistingPlacements: [],
  })

  // const [heights, setHeights] = useState<number[]>([])

  // useMutationObserver(
  //   dom.getRootNode(props) as unknown as HTMLElement,
  //   mutationsList => {
  //     for (const mutation of mutationsList) {
  //       if (
  //         mutation.type === 'attributes' &&
  //         mutation.attributeName === 'data-state'
  //       ) {
  //         const target = mutation.target as HTMLElement
  //         const initialHeight = Number(
  //           getStyleProperty(target, '--initialHeight')
  //         )
  //         const index = Number(getStyleProperty(target, '--index'))

  //         // data state가 visible로 변할때
  //         // height측정 toasts에 각 toast별로 initialHeight를 넣고
  //         // @TODO
  //         // setHeights 대신 state가 바꼈을때 group을 그냥 리렌더링만 하게 만드는 방법
  //         setHeights(prev => {
  //           prev[index] = initialHeight
  //           return [...prev]
  //         })
  //       }
  //     }
  //   },
  //   {
  //     attributes: true,
  //     childList: true,
  //     subtree: true,
  //     characterData: false,
  //   }
  // )

  return {
    state: {
      state,
    },
    dispatch,
  }
}
