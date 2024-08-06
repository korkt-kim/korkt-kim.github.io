import { defaults } from 'lodash-es'
import { ComponentProps } from 'react'

import { useGetId } from '../../utils/utils'
import { UseCheckboxProps } from './type'
import { useCheckboxMachine } from './useCheckboxMachine'

const idPrefix = 'zk-checkbox-'

export const useCheckbox = (props?: UseCheckboxProps) => {
  const getId = useGetId()
  const ids = defaults(
    props?.ids,
    getId({
      rootId: idPrefix,
      labelId: `${idPrefix}-label`,
      inputId: `${idPrefix}-input`,
    } as const)
  )

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
