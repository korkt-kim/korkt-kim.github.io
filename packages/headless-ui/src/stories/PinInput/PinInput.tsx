import '../../styles/pinInput.css'

import { forwardRef, ReactNode, useRef } from 'react'

import { usePinInput } from '../../components'

export interface PinInputProps {
  /**
   * Specifies pin-input value.
   */
  value?: string
  /**
   * Specifies pin-input value on init.
   */
  defaultValue?: string
  /**
   *
   */
  length: number
  /**
   * Specifies whether the pin-input is disabled.
   */
  disabled?: boolean
  /**
   * The name attribute of the pin-input, used to identify the form data after submission.
   */
  name?: string
  /**
   * The function to call when the pin-input value changes.
   */
  onChange?: (value: string) => void
  /**
   *  label
   */
  children?: ReactNode
  /**
   * on
   */
  onComplete?: (value: string) => void
  /**
   * Specifies whether the pin-input value is masked.
   */
  password?: boolean
}

export const PinInput = forwardRef<HTMLSpanElement, PinInputProps>(
  (
    {
      value,
      children,
      disabled = false,
      name,
      onChange,
      onComplete,
      length,
      password,
      defaultValue,
    },
    forwardedRef
  ) => {
    const _ref = useRef<HTMLSpanElement>(null)
    const api = usePinInput({
      value,
      defaultValue,
      disabled,
      name,
      length,
      onChange,
      onComplete,
      password,
      getRootNode: () =>
        forwardedRef && 'current' in forwardedRef
          ? forwardedRef?.current
          : _ref.current,
    })

    return (
      <>
        <span {...api.getRootProps()} ref={forwardedRef ?? _ref}>
          <label {...api.getLabelProps()}>{children}</label>
          {new Array(length).fill(null).map((_, index) => {
            return <input key={index} {...api.getInputProps({ index })} />
          })}
          <input {...api.getHiddenInputProps()} />
        </span>
      </>
    )
  }
)

PinInput.displayName = 'PinInput'
