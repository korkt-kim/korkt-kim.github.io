import { label } from './label'
import { colors } from './colors'
import { labelColors } from './labelColors'

//@TODO 추후 TextArea Size,Color 옵션 추가
export const standard = {
  base: {
    textarea: {
      borderWidth: 'border-b',
      borderColor: 'placeholder-shown:border-blue-gray-200',
    },
    label,
  },
  colors: {
    textarea: colors,
    label: labelColors,
  },
  error: {
    textarea: {
      borderColor: 'border-red-500 placeholder-shown:border-red-500',
      borderColorFocused: 'focus:border-red-500',
    },
    label: {
      color:
        'text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500',
      after: 'after:border-red-500 peer-focus:after:border-red-500',
    },
  },
  success: {
    textarea: {
      borderColor: 'border-green-500 placeholder-shown:border-green-500',
      borderColorFocused: 'focus:border-green-500',
    },
    label: {
      color:
        'text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500',
      after: 'after:border-green-500 peer-focus:after:border-green-500',
    },
  },
  shrink: {
    textarea: {},
    label: {
      fontSize: '!text-[11px]',
      lineHeight: '!leading-tight',
    },
  },
}
