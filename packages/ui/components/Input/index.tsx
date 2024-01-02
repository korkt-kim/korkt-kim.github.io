import type { ReactNode } from 'react'

import React from 'react'

// utils
import classnames from 'classnames'

// context
import { inputStyle } from './theme'

import { recordValuesToString } from '../../util/recordValuesToString'
import { defaults } from 'lodash-es'

export type variant = 'standard' | 'outlined'
export type size = 'md' | 'lg'
export type label = string
export type error = boolean
export type success = boolean
export type icon = ReactNode
export type resize = boolean
export type labelProps = {
  [key: string]: any
}
export type containerProps = {
  [key: string]: any
}
export type shrink = boolean
export type className = string

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'> {
  variant?: variant
  size?: size
  label?: label
  error?: error
  success?: success
  icon?: icon
  labelProps?: labelProps
  containerProps?: containerProps
  className?: className
  shrink?: shrink
  inputRef?: React.Ref<HTMLInputElement>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      size,
      label,
      error,
      success,
      icon,
      containerProps,
      labelProps,
      className,
      shrink,
      inputRef,
      ...rest
    },
    ref
  ) => {
    // 1. init
    const { defaultProps, styles } = inputStyle
    const { base, variants } = styles

    // 2. set default props
    variant = variant ?? defaultProps.variant
    size = size ?? defaultProps.size
    label = label ?? defaultProps.label
    labelProps = labelProps ?? defaultProps.labelProps
    containerProps = containerProps ?? defaultProps.containerProps
    className = className ?? defaultProps.className
    shrink = shrink ?? defaultProps.shrink
    icon = icon ?? defaultProps.icon

    // 3. set styles
    const inputVariant = variants[variant]
    const inputSize = inputVariant.sizes[size]
    const inputError = recordValuesToString(inputVariant.error.input)
    const inputSuccess = recordValuesToString(inputVariant.success.input)
    const inputShrink = recordValuesToString(inputVariant.shrink.input)
    const inputColor = recordValuesToString(inputVariant.colors.input)
    const labelError = recordValuesToString(inputVariant.error.label)
    const labelSuccess = recordValuesToString(inputVariant.success.label)
    const labelShrink = recordValuesToString(inputVariant.shrink.label)
    const labelColor = recordValuesToString(inputVariant.colors.label)
    const containerClasses = classnames(
      recordValuesToString(base.container),
      recordValuesToString(inputSize.container),
      containerProps?.className
    )
    const inputClasses = classnames(
      recordValuesToString(base.input),
      recordValuesToString(inputVariant.base.input),
      recordValuesToString(inputSize.input),
      { [recordValuesToString(inputVariant.base.inputWithIcon)]: icon },
      { [inputColor]: !error && !success },
      { [inputError]: error },
      { [inputSuccess]: success },
      { [inputShrink]: shrink },
      className
    )
    const labelClasses = classnames(
      recordValuesToString(base.label),
      recordValuesToString(inputVariant.base.label),
      recordValuesToString(inputSize.label),
      { [labelColor]: !error && !success },
      { [labelError]: error },
      { [labelSuccess]: success },
      { [labelShrink]: shrink },
      labelProps?.className
    )
    const iconClasses = classnames(
      recordValuesToString(base.icon),
      recordValuesToString(inputVariant.base.icon),
      recordValuesToString(inputSize.icon)
    )
    const asteriskClasses = classnames(recordValuesToString(base.asterisk))

    // 4. return
    return (
      <div {...containerProps} ref={ref} className={containerClasses}>
        {icon && <div className={iconClasses}>{icon}</div>}
        <input
          {...rest}
          ref={inputRef}
          className={inputClasses}
          placeholder={rest?.placeholder || ' '}
        />
        <label {...labelProps} className={labelClasses}>
          {label}{' '}
          {rest.required ? <span className={asteriskClasses}>*</span> : ''}
        </label>
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
