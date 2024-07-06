import { defaults } from 'lodash-es'
import { ComponentProps } from 'react'

import { getId } from '../../utils/utils'
import { UseCheckboxProps } from './type'
import { useCheckboxMachine } from './useCheckboxMachine'

const idPrefix = 'zk-checkbox-'

const defaultIds = {
  rootId: getId(idPrefix),
  labelId: getId(`${idPrefix}-label`),
  inputId: getId(`${idPrefix}-input`),
}

export const useCheckbox = (props?: UseCheckboxProps) => {
  const ids = defaults(props?.ids, defaultIds)

  const { state, dispatch } = useCheckboxMachine(props)

  return {
    checked: state.checked,
    disabled: state.disabled,
    indeterminate: state.indeterminate,
    setChecked: (checked: boolean) => {
      dispatch({ type: 'SET_CHECKED', checked })
    },
    setIndeterminate: (indeterminate: boolean) => {
      dispatch({ type: 'SET_INDETERMINATE', indeterminate })
    },
    getRootProps: () => ({
      id: ids.rootId,
    }),
    getLabelProps: (): ComponentProps<'label'> => ({
      id: ids.labelId,
      htmlFor: ids.inputId,
    }),
    getInputProps: (): ComponentProps<'input'> => ({
      type: 'checkbox',
      id: ids.inputId,
      name: props?.name,
      checked: state.checked,
      disabled: state.disabled,

      onChange: e => {
        dispatch({
          type: 'SET_CHECKED',
          checked: e.target.checked,
          isTrusted: true,
        })
      },
    }),
  }
}
