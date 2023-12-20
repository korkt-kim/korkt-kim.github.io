import { outlined } from './outlined'
import { standard } from './standard'
import { TextareaProps } from '..'

// types

export interface TextareaSizeStylesType {
  container?: object
  textarea?: object
  label?: object
}

export interface TextareaStateStylesType {
  textarea?: object
  label?: object
}

export interface TextareaVariantStylesType {
  base?: {
    container?: object
    textarea?: object
    label?: object
  }
  error?: TextareaStateStylesType
  success?: TextareaStateStylesType
  shrink?: TextareaStateStylesType
}

export interface TextareaStylesType {
  defaultProps?: TextareaProps
  valid?: {
    variants?: string[]
    sizes?: string[]
    colors?: string[]
  }
  styles?: {
    base?: {
      container?: object
      textarea?: object
      label?: object
    }
    variants?: {
      outlined: TextareaVariantStylesType
      standard: TextareaVariantStylesType
      static: TextareaVariantStylesType
    }
  }
}

export const textareaStyle = {
  defaultProps: {
    variant: 'outlined',
    label: '',
    error: false,
    success: false,
    resize: true,
    labelProps: undefined,
    containerProps: undefined,
    shrink: false,
  },
  styles: {
    base: {
      container: {
        position: 'relative',
        width: 'w-full',
        minWidth: 'min-w-[200px]',
      },
      textarea: {
        peer: 'peer',
        width: 'w-full',
        height: 'h-full',
        minHeight: 'min-h-[100px]',
        bg: 'bg-transparent',
        color: 'text-blue-gray-700',
        fontFamily: 'font-sans',
        fontWeight: 'font-normal',
        outline: 'outline outline-0 focus:outline-0',
        resize: 'resize-y',
        disabled:
          'disabled:bg-blue-gray-50 disabled:border-0 disabled:resize-none disabled:cursor-not-allowed',
        transition: 'transition-all',
      },
      label: {
        display: 'flex',
        width: 'w-full',
        height: 'h-full',
        userSelect: 'select-none',
        pointerEvents: 'pointer-events-none',
        position: 'absolute',
        left: 'left-0',
        fontWeight: 'font-normal',
        color: 'peer-placeholder-shown:text-blue-gray-500',
        lineHeight: 'leading-tight peer-focus:leading-tight',
        disabled:
          'peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500',
        transition: 'transition-all',
      },
    },
    variants: {
      outlined,
      standard,
    },
  },
} as const
