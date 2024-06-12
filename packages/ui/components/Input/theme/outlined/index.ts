import { colors } from './colors'
import { labelColors } from './labelColors'

export const inputOutlined = {
  base: {
    input: {
      borderWidth: 'placeholder-shown:border',
      borderColor:
        'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200',
      floated: {
        borderWidth: 'border focus:border-2',
        borderColor: 'focus:border-t-transparent',
      },
      placeholder: 'placeholder:opacity-0 focus:placeholder:opacity-100',
    },
    inputWithIcon: {
      pr: '!pr-9',
    },
    icon: {
      top: 'top-2/4',
      right: 'right-3',
      transform: '-translate-y-2/4',
    },
    label: {
      position: '-top-1.5',
      fontSize: 'peer-placeholder-shown:text-sm',
      floated: {
        fontSize: 'text-[1rem] peer-focus:text-[1rem]',
      },
      before: {
        content: "before:content[' ']",
        display: 'before:block',
        boxSizing: 'before:box-border',
        width: 'before:w-[10px]',
        height: 'before:h-[6px]',
        mt: 'before:mt-[6.5px]',
        mr: 'before:mr-[4px]',
        borderColor: 'peer-placeholder-shown:before:border-transparent',
        borderRadius: 'before:rounded-tl-md',
        floated: {
          bt: 'before:border-t peer-focus:before:border-t-2',
          bl: 'before:border-l peer-focus:before:border-l-2',
        },
        pointerEvents: 'before:pointer-events-none',
        transition: 'before:transition-all',
        disabled: 'peer-disabled:before:border-transparent',
      },
      after: {
        content: "after:content[' ']",
        display: 'after:block',
        flexGrow: 'after:flex-grow',
        boxSizing: 'after:box-border',
        width: 'after:w-[10px]',
        height: 'after:h-[6px]',
        mt: 'after:mt-[6.5px]',
        ml: 'after:ml-[4px]',
        borderColor: 'peer-placeholder-shown:after:border-transparent',
        borderRadius: 'after:rounded-tr-md',
        floated: {
          bt: 'after:border-t peer-focus:after:border-t-[2px]',
          br: 'after:border-r peer-focus:after:border-r-[2px]',
        },
        pointerEvents: 'after:pointer-events-none',
        transition: 'after:transition-all',
        disabled: 'peer-disabled:after:border-transparent',
      },
    },
  },
  sizes: {
    md: {
      container: {
        height: 'h-[40px]',
      },
      input: {
        fontSize: 'text-sm',
        px: 'px-[12px]',
        py: 'py-[10px]',
        borderRadius: 'rounded-[7px]',
      },
      label: {
        lineHeight: 'peer-placeholder-shown:leading-[3.75]',
      },
      icon: {
        width: 'w-[20px]',
        height: 'h-[20px]',
      },
    },
    lg: {
      container: {
        height: 'h-[44px]',
      },
      input: {
        fontSize: 'text-sm',
        px: 'px-[12px]',
        py: 'py-[12px]',
        borderRadius: 'rounded-md',
      },
      label: {
        lineHeight: 'peer-placeholder-shown:leading-[4.1]',
      },
      icon: {
        width: 'w-[24px]',
        height: 'h-[24px]',
      },
    },
  },
  colors: {
    input: colors,
    label: labelColors,
  },
  error: {
    input: {
      borderColor:
        'border-red-500 placeholder-shown:border-t-red-500 placeholder-shown:border-red-500',
      borderColorFocused: 'focus:border-red-500',
    },
    label: {
      color:
        'text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500',
      before: 'before:border-red-500 peer-focus:before:border-red-500',
      after: 'after:border-red-500 peer-focus:after:border-red-500',
    },
  },
  success: {
    input: {
      borderColor:
        'border-green-500 placeholder-shown:border-t-green-500 placeholder-shown:border-green-500',
      borderColorFocused: 'focus:border-green-500',
    },
    label: {
      color:
        'text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500',
      before: 'before:border-green-500 peer-focus:before:border-green-500',
      after: 'after:border-green-500 peer-focus:after:border-green-500',
    },
  },
  shrink: {
    input: {
      borderTop: '!border-t-transparent',
    },
    label: {
      fontSize: '!text-[16px]',
      lineHeight: '!leading-tight',
      borderColor: 'before:!border-blue-gray-200 after:!border-blue-gray-200',
    },
  },
}
