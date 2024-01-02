import { ComponentProps, forwardRef } from 'react'

import classnames from 'classnames'

import { textareaStyle } from './theme'

import { recordValuesToString } from '../../util/recordValuesToString'

type variant = 'standard' | 'outlined'
type labelProps = {
  [key: string]: any
}
type size = 'md' | 'lg'

type containerProps = {
  [key: string]: any
}

export interface TextareaProps {
  variant?: variant
  label?: string
  size?: size
  error?: boolean
  success?: boolean
  resize?: boolean
  labelProps?: labelProps
  containerProps?: containerProps
  shrink?: boolean
}

export const Textarea = forwardRef<
  HTMLDivElement,
  TextareaProps & ComponentProps<'textarea'>
>(
  (
    {
      variant,
      label,
      color,
      size,
      error,
      success,
      resize,
      labelProps,
      containerProps,
      shrink,
      className,
      ...rest
    },
    ref
  ) => {
    // 1. init
    const { defaultProps, styles } = textareaStyle
    const { base, variants } = styles

    // 2. set default props
    variant = variant ?? defaultProps.variant
    size = size ?? defaultProps.size
    label = label ?? defaultProps.label
    labelProps = labelProps ?? defaultProps.labelProps
    containerProps = containerProps ?? defaultProps.containerProps
    shrink = shrink ?? defaultProps.shrink

    // 3. set styles
    const textareaVariant = variants[variant]
    const textareaError = recordValuesToString(textareaVariant.error.textarea)
    const textareaSuccess = recordValuesToString(
      textareaVariant.success.textarea
    )
    const textareaShrink = recordValuesToString(textareaVariant.shrink.textarea)
    const textareaColor = recordValuesToString(textareaVariant.colors.textarea)
    const labelError = recordValuesToString(textareaVariant.error.label)
    const labelSuccess = recordValuesToString(textareaVariant.success.label)
    const labelShrink = recordValuesToString(textareaVariant.shrink.label)
    const labelColor = recordValuesToString(textareaVariant.colors.label)
    const containerClasses = classnames(
      recordValuesToString(base.container),
      containerProps?.className
    )

    const textareaClasses = classnames(
      recordValuesToString(base.textarea),
      recordValuesToString(textareaVariant.base.textarea),
      recordValuesToString(textareaVariant.sizes[size].textarea),
      { [textareaColor]: !error && !success },
      { [textareaError]: error },
      { [textareaSuccess]: success },
      { [textareaShrink]: shrink },
      !resize ? '!resize-none' : '',
      className
    )
    const labelClasses = classnames(
      recordValuesToString(base.label),
      recordValuesToString(textareaVariant.base.label),
      recordValuesToString(textareaVariant.sizes[size].label),
      { [labelColor]: !error && !success },
      { [labelError]: error },
      { [labelSuccess]: success },
      { [labelShrink]: shrink },
      labelProps?.className
    )

    // 4. return
    return (
      <div ref={ref} className={containerClasses}>
        <textarea
          {...rest}
          className={textareaClasses}
          placeholder={rest?.placeholder || ' '}
        />
        <label className={labelClasses}>{label}</label>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
