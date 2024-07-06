import { useCallback, useEffect, useReducer } from 'react'

import { createScope, ScopeContext } from '../../utils/createScope'
import { UseCheckboxProps } from './type'

type State = Pick<UseCheckboxProps, 'checked' | 'indeterminate'>

export type UseCheckboxMachineProps = UseCheckboxProps

export const useCheckboxMachine = (props?: UseCheckboxMachineProps) => {
  const dom = createScope({
    setChecked: (checked: boolean) => {
      const element = dom.querySelector<HTMLInputElement>(props ?? {}, 'input')

      if (!element) {
        return
      }

      element.checked = checked
    },
    setIndeterminate: (indeterminate: boolean) => {
      const element = dom.querySelector<HTMLInputElement>(props ?? {}, 'input')

      if (!element) {
        return
      }

      element.indeterminate = indeterminate
    },
    getInput: (ctx: ScopeContext) => {
      return dom.querySelector<HTMLInputElement>(ctx, 'input')
    },
  })

  const getComputedState = useCallback(
    (state: State) => ({
      disabled: !!props?.disabled,
      indeterminate: props?.indeterminate ?? state.indeterminate,
      checked: props?.checked ?? state.checked,
    }),
    [props?.checked, props?.disabled, props?.indeterminate]
  )

  const reducer = useCallback(
    (
      state: State,
      action:
        | { type: 'SET_CHECKED'; checked: boolean; isTrusted?: boolean }
        | {
            type: 'SET_INDETERMINATE'
            indeterminate: boolean
            isTrusted?: boolean
          }
    ) => {
      const { indeterminate, disabled } = getComputedState(state)
      switch (action.type) {
        // action
        case 'SET_CHECKED': {
          // guard
          if (action.isTrusted && (indeterminate || disabled)) {
            return { ...state }
          }

          //logic
          const checked = !!action.checked
          props?.onChange?.({ checked, indeterminate: !!state.indeterminate })

          return { ...state, checked }
        }

        case 'SET_INDETERMINATE': {
          //guard
          if (action.isTrusted && disabled) {
            return { ...state }
          }

          //logic
          const indeterminate = !!action.indeterminate
          dom.setIndeterminate(indeterminate)

          props?.onChange?.({
            checked: !!state.checked,
            indeterminate,
          })

          return { ...state, indeterminate }
        }

        default:
          return { ...state }
      }
    },
    [dom, getComputedState, props]
  )

  const [state, dispatch] = useReducer(reducer, {
    checked: !!props?.checked,
    indeterminate: !!props?.indeterminate,
  })

  // computed
  const { checked, indeterminate, disabled } = getComputedState(state)

  // watch
  useEffect(() => {
    if (typeof indeterminate === 'undefined') {
      return
    }

    dom.setIndeterminate(indeterminate)
  }, [dom, indeterminate])

  return {
    state: { ...state, checked, indeterminate, disabled },
    dispatch,
  }
}
