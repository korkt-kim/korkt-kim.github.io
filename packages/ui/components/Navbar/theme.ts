import { NavbarProps } from '.'

export interface NavbarStylesType {
  defaultProps?: NavbarProps
  styles?: {
    base?: {
      navbar?: {
        initial?: object
        shadow?: object
        fullWidth?: object
      }
    }
  }
}

export const navbarStyle = {
  defaultProps: {
    shadow: true,
    fullWidth: false,
  },
  styles: {
    base: {
      initial: {
        display: 'flex',
        borderRadius: 'rounded-xl',
        py: 'py-4',
        px: 'px-8',
        background: 'bg-transparent',
        color: 'text-black',
        boxShadow: 'shadow-none',
      },
      shadow: {
        boxShadow: 'shadow-md',
      },
      fullWidth: {
        width: 'w-full',
        maxWidth: 'max-w-full',
        rounded: 'rounded-none',
        px: 'px-4',
      },
    },
  },
} as const
