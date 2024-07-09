import { forwardRef, ReactNode, useRef } from 'react'

import { useCheckbox } from '../../components'
import { CheckboxCurrentState } from '../../components/Checkbox/type'

export interface CheckboxProps {
  /**
   * Specifies whether the checkbox is checked.
   */
  checked?: boolean
  /**
   * Specifies whether the checkbox is disabled.
   */
  disabled?: boolean
  /**
   * Specifies whether the checkbox is in an indeterminate state.
   */
  indeterminate?: boolean
  /**
   * The name attribute of the checkbox, used to identify the form data after submission.
   */
  name?: string
  /**
   * The function to call when the checkbox state changes.
   */
  onChange?: (props: CheckboxCurrentState) => void
  /**
   *  label
   */
  children?: ReactNode
  /**
   * Specifies whether the checkbox is checked on init
   */
  defaultChecked?: boolean
}

export const Checkbox = forwardRef<HTMLSpanElement, CheckboxProps>(
  (
    {
      checked,
      children,
      disabled = false,
      indeterminate,
      name,
      onChange,
      defaultChecked = false,
    },
    forwardedRef
  ) => {
    const _ref = useRef<HTMLSpanElement>(null)
    const api = useCheckbox({
      checked,
      defaultChecked,
      disabled,
      indeterminate,
      name,
      onChange,
      getRootNode: () =>
        forwardedRef && 'current' in forwardedRef
          ? forwardedRef?.current
          : _ref.current,
    })

    return (
      <>
        <span {...api.getRootProps()} ref={forwardedRef ?? _ref}>
          <label {...api.getLabelProps()}>
            <input {...api.getInputProps()} />
            {children}
          </label>
        </span>
        <button onClick={() => api.setChecked(!api.checked)}>toggle</button>
        <button onClick={() => api.setIndeterminate(!api.indeterminate)}>
          indeterminate
        </button>
      </>
    )
  }
)

Checkbox.displayName = 'Checkbox'
