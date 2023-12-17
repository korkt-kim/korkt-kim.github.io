import { NavbarProps } from '.'

export interface NavbarStylesType {
  defaultProps?: NavbarProps
  styles?: {
    base?: {
      navbar?: {
        initial?: object
        shadow?: object
        blurred?: object
        fullWidth?: object
      }
    }
  }
}

export const navbar = {
  defaultProps: {
    direction: 'h',
    justify: 'between',
    align: 'center',
    shadow: true,
    blurred: true,
    fullWidth: false,
  },
  styles: {
    base: {
      navbar: {
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
        blurred: {
          backdropFilter: 'backdrop-saturate-200 backdrop-blur-2xl',
          bgOpacity: 'bg-opacity-80',
          borderWidth: 'border',
          borderColor: 'border-white/80',
        },
        fullWidth: {
          width: 'w-full',
          maxWidth: 'max-w-full',
          rounded: 'rounded-none',
          px: 'px-4',
        },
      },
    },
  },
} as const
