import inputOutlined from './outlined'
import inputStandard from './standard'

export interface InputSizeStylesType {
  container?: object
  input?: object
  label?: object
  icon?: object
}

export interface InputStateStylesType {
  input?: object
  label?: object
}

export interface InputVariantStylesType {
  base?: {
    input?: object
    inputWithIcon?: object
    icon?: object
    label?: object
  }
  sizes?: {
    md?: InputSizeStylesType
    lg?: InputSizeStylesType
  }
  error?: InputStateStylesType
  success?: InputStateStylesType
  shrink?: InputStateStylesType
}

export const inputStyle = {
  defaultProps: {
    variant: 'outlined',
    size: 'md',
    label: '',
    error: false,
    success: false,
    icon: undefined,
    labelProps: undefined,
    containerProps: undefined,
    shrink: false,
    className: '',
  },
  styles: {
    base: {
      container: {
        position: 'relative',
        width: 'w-full',
        minWidth: 'min-w-[200px]',
      },
      input: {
        peer: 'peer',
        width: 'w-full',
        height: 'h-full',
        bg: 'bg-transparent',
        color: 'text-blue-gray-700',
        fontFamily: 'font-sans',
        fontWeight: 'font-normal',
        outline: 'outline outline-0 focus:outline-0',
        disabled:
          'disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed',
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
        overflow: '!overflow-visible',
        textOverflow: 'truncate',
        color: 'peer-placeholder-shown:text-blue-gray-500',
        lineHeight: 'leading-tight peer-focus:leading-tight',
        disabled:
          'peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500',
        transition: 'transition-all',
      },
      icon: {
        display: 'grid',
        placeItems: 'place-items-center',
        position: 'absolute',
        color: 'text-blue-gray-500',
      },
      asterisk: {
        display: 'inline-block',
        color: 'text-red-500',
        ml: 'ml-0.5',
      },
    },
    variants: {
      outlined: inputOutlined,
      standard: inputStandard,
    },
  },
} as const
