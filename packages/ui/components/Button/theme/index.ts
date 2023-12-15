import { ButtonProps } from '..'
import { buttonFilled } from './buttonFilled'
import { buttonOutlined } from './buttonOutlined'
import { buttonText } from './buttonText'

export * from './buttonFilled'
export * from './buttonOutlined'
export * from './buttonText'

export interface ButtonStyle {
  defaultProps?: ButtonProps
  styles?: {
    base?: {
      initial?: object
      fullWidth?: object
    }
    sizes?: {
      sm?: object
      md?: object
      lg?: object
    }
    variants?: {
      filled?: typeof buttonFilled
      outlined?: typeof buttonOutlined
      text?: typeof buttonText
    }
  }
}

export const buttonStyle = {
  defaultProps: {
    variant: 'filled',
    size: 'md',
    fullWidth: false,
    loading: false,
  },
  styles: {
    base: {
      initial: {
        verticalAlign: 'align-middle',
        userSelect: 'select-none',
        fontFamily: 'font-sans',
        fontWeight: 'font-bold',
        textAlign: 'text-center',
        textTransform: 'uppercase',
        transition: 'transition-all',
        disabled:
          'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none',
      },
      fullWidth: {
        display: 'block',
        width: 'w-full',
      },
    },
    sizes: {
      sm: {
        fontSize: 'text-xs',
        py: 'py-2',
        px: 'px-4',
        borderRadius: 'rounded-lg',
      },
      md: {
        fontSize: 'text-xs',
        py: 'py-3',
        px: 'px-6',
        borderRadius: 'rounded-lg',
      },
      lg: {
        fontSize: 'text-sm',
        py: 'py-3.5',
        px: 'px-7',
        borderRadius: 'rounded-lg',
      },
    },
    variants: {
      filled: buttonFilled,
      outlined: buttonOutlined,
      text: buttonText,
    },
  },
} as const
