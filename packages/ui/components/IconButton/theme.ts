import { ButtonProps } from '../Button'
import { buttonFilled } from '../Button/theme/buttonFilled'
import { buttonOutlined } from '../Button/theme/buttonOutlined'
import { buttonText } from '../Button/theme/buttonText'

export interface IconButtonStyleTypes {
  defaultProps?: ButtonProps
  styles?: {
    base?: object
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

export const iconButtonStyle = {
  defaultProps: {
    variant: 'filled',
    size: 'md',
  },
  styles: {
    base: {
      position: 'relative',
      verticalAlign: 'align-middle',
      userSelect: 'select-none',
      fontFamily: 'font-sans',
      fontWeight: 'font-medium',
      textAlign: 'text-center',
      textTransform: 'uppercase',
      transition: 'transition-all',
      disabled:
        'disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none',
    },
    sizes: {
      sm: {
        width: 'w-[32px]',
        maxWidth: 'max-w-[32px]',
        height: 'h-[32px]',
        maxHeight: 'max-h-[32px]',
        borderRadius: 'rounded-lg',
        fontSize: 'text-xs',
      },
      md: {
        width: 'w-[40px]',
        maxWidth: 'max-w-[40px]',
        height: 'h-[40px]',
        maxHeight: 'max-h-[40px]',
        borderRadius: 'rounded-lg',
        fontSize: 'text-xs',
      },
      lg: {
        width: 'w-[48px]',
        maxWidth: 'max-w-[48px]',
        height: 'h-[48px]',
        maxHeight: 'max-h-[48px]',
        borderRadius: 'rounded-lg',
        fontSize: 'text-sm',
      },
    },
    variants: {
      filled: buttonFilled,
      outlined: buttonOutlined,
      text: buttonText,
    },
  },
} as const
