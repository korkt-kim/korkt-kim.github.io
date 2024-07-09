import { useCallback, useEffect, useReducer, useState } from 'react'

import { createScope } from '../../utils/createScope'
import { isInState as _isInState } from '../../utils/utils'
import { UsePinInputProps } from './type'

type State = 'idle' | 'focused'

interface Context {
  value: string[]
  focusedIndex: number
}

export type UsePinInputMachineProps = UsePinInputProps

export const usePinInputMachine = (props: UsePinInputMachineProps) => {
  const dom = createScope({
    getInputs: () => {
      return dom
        .getRootNode(props)
        .querySelectorAll<HTMLInputElement>(
          'input[data-scope="pin-input"][data-part="input"]'
        )
    },
  })
  const [state, changeState] = useState<State>('idle')
  const isInState = _isInState<State>()

  const getComputedState = useCallback(
    (context: Context) => ({
      disabled: !!props.disabled,
      value: (props.value?.split('') ?? context.value).slice(0, props.length),
    }),
    [props]
  )

  const isComplete = useCallback(
    (value: string[]) => {
      return props.length === value.join('').length
    },
    [props]
  )

  const reducer = useCallback(
    (
      ctx: Context,
      action:
        | { type: 'PASTE'; value: string; isTrusted?: boolean }
        | { type: 'INPUT'; value: string; isTrusted?: boolean }
        | { type: 'BACKSPACE'; isTrusted?: boolean }
        | { type: 'FOCUS'; focusedIndex: number; isTrusted?: boolean }
        | { type: 'BLUR'; isTrusted?: boolean }
    ) => {
      const { disabled } = getComputedState(ctx)

      switch (action.type) {
        // action
        case 'INPUT': {
          // guard
          if (action.isTrusted && disabled) {
            return { ...ctx }
          }

          if (!isInState(['focused'], state)) {
            return { ...ctx }
          }

          //logic
          const newValue = ctx.value
          newValue[ctx.focusedIndex] = action.value[0]

          props.onChange?.(newValue.join(''))

          // @TODO: watch로 대신하는 방법 찾기
          if (isComplete(newValue)) {
            props.onComplete?.(newValue.join(''))
          }

          return {
            ...ctx,
            value: newValue,
            focusedIndex: Math.min(props.length - 1, ctx.focusedIndex + 1),
          }
        }

        case 'FOCUS': {
          //guard
          if (action.isTrusted && disabled) {
            return { ...ctx }
          }

          if (!isInState(['idle', 'focused'], state)) {
            return { ...ctx }
          }

          //changeState
          changeState('focused')

          //logic
          return { ...ctx, focusedIndex: action.focusedIndex }
        }

        case 'BLUR': {
          //guard
          if (action.isTrusted && disabled) {
            return { ...ctx }
          }

          if (!isInState(['focused'], state)) {
            return { ...ctx }
          }

          //changeState
          changeState('idle')

          //logic
          return { ...ctx, focusedIndex: -1 }
        }

        case 'BACKSPACE': {
          //guard
          if (action.isTrusted && disabled) {
            return { ...ctx }
          }

          if (!isInState(['focused'], state)) {
            return { ...ctx }
          }

          const newValue = ctx.value
          newValue[ctx.focusedIndex] = ''

          props.onChange?.(newValue.join(''))

          //logic
          return {
            ...ctx,
            value: newValue,
            focusedIndex: Math.max(0, ctx.focusedIndex - 1),
          }
        }

        case 'PASTE': {
          //guard
          if (action.isTrusted && disabled) {
            return { ...ctx }
          }

          if (!isInState(['focused'], state)) {
            return { ...ctx }
          }

          //logic
          const newFocusedIndex = Math.min(
            ctx.focusedIndex + action.value.length,
            props.length - 1
          )

          const newValue = [
            ...ctx.value.slice(0, ctx.focusedIndex),
            ...action.value.split(''),
          ].slice(0, newFocusedIndex + 1)

          props.onChange?.(newValue.join(''))

          if (isComplete(newValue)) {
            props.onComplete?.(newValue.join(''))
          }

          return {
            ...ctx,
            value: newValue,
            focusedIndex: newFocusedIndex,
          }
        }

        default:
          return { ...ctx }
      }
    },
    [getComputedState, isComplete, isInState, props, state]
  )

  const [context, dispatch] = useReducer(reducer, {
    value: props.value?.split('') ?? (props.defaultValue ?? '')?.split(''),
    focusedIndex: -1,
  })

  // computed
  const { disabled, value } = getComputedState(context)

  // watch
  useEffect(() => {
    dom.getInputs().forEach((input, index) => {
      input.value = value[index] ?? ''
    })
  }, [dom, props, value])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.requestAnimationFrame(() => {
      dom.getInputs().item(context.focusedIndex)?.focus()
    })
  }, [context.focusedIndex, dom])

  return {
    state: { ...context, disabled, value: value.join('') },
    dispatch,
  }
}
