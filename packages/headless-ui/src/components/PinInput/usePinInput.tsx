import { defaults } from 'lodash-es'
import { ComponentProps, useMemo } from 'react'

import { visuallyHiddenStyle } from '../../utils/dom'
import { getId } from '../../utils/utils'
import { ScopeAttribute, UsePinInputProps } from './type'
import { usePinInputMachine } from './usePinInputMachine'

const idPrefix = 'zk-pininput-'

const dataScope = 'pin-input'
const scopeAttr = {
  Root: {
    'data-scope': dataScope,
    'data-part': 'root',
  },
  Input: {
    'data-scope': dataScope,
    'data-part': 'input',
  },
  Label: {
    'data-scope': dataScope,
    'data-part': 'label',
  },
}

const defaultIds = {
  rootId: getId(idPrefix),
  labelId: getId(`${idPrefix}-label`),
  inputId: getId(`${idPrefix}-input`),
}

export const usePinInput = (props: UsePinInputProps) => {
  const ids = defaults(props?.ids, defaultIds)

  const { state, dispatch } = usePinInputMachine(props)

  return useMemo(
    () => ({
      value: state.value,
      disabled: state.disabled,
      getRootProps: () => ({
        id: ids.rootId,
        ...scopeAttr.Root,
      }),
      getLabelProps: (): ComponentProps<'label'> & ScopeAttribute => ({
        id: ids.labelId,
        htmlFor: ids.inputId,
        ...scopeAttr.Label,
        onClick: () => {
          dispatch({ type: 'FOCUS', focusedIndex: 0, isTrusted: true })
        },
      }),
      getHiddenInputProps: (): ComponentProps<'input'> => ({
        id: ids.inputId,
        'aria-hidden': true,
        type: 'text',
        tabIndex: -1,
        name: props?.name,
        value: state.value,
        readOnly: true,
        style: visuallyHiddenStyle,
        disabled: state.disabled,
      }),
      getInputProps: ({
        index,
      }: {
        index: number
      }): ComponentProps<'input'> & ScopeAttribute => {
        return {
          type: props.password ? 'password' : 'text',
          onFocus: () => {
            dispatch({ type: 'FOCUS', focusedIndex: index, isTrusted: true })
          },
          onBlur: () => {
            dispatch({ type: 'BLUR' })
          },

          onChange: e => {
            const inputType = (e.nativeEvent as InputEvent).inputType

            if (
              inputType === 'deleteContentBackward' ||
              inputType === 'deleteContentForward'
            ) {
              dispatch({ type: 'BACKSPACE' })
              return
            }

            if (inputType === 'insertFromPaste') {
              dispatch({ type: 'PASTE', value: e.currentTarget.value })
              return
            }

            dispatch({
              type: 'INPUT',
              value: e.currentTarget.value,
              isTrusted: true,
            })
            return
          },
          disabled: state.disabled,
          ...scopeAttr.Input,
        }
      },
    }),
    [
      dispatch,
      ids.inputId,
      ids.labelId,
      ids.rootId,
      props?.name,
      props.password,
      state.disabled,
      state.value,
    ]
  )
}
