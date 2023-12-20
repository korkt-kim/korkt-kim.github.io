import { label } from './label'
import { colors } from './color'
import { labelColors } from './labelColor'

//@TODO 추후 TextArea Size,Color 옵션 추가
export const outlined = {
  base: {
    textarea: {
      borderWidth: 'placeholder-shown:border',
      borderColor:
        'placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200',
      floated: {
        borderWidth: 'border focus:border-2',
        borderColor: 'border-t-transparent focus:border-t-transparent',
      },
    },
    label,
  },
  colors: {
    textarea: colors,
    label: labelColors,
  },
  error: {
    textarea: {
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
    textarea: {
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
    textarea: {
      borderTop: '!border-t-transparent',
    },
    label: {
      fontSize: '!text-[11px]',
      lineHeight: '!leading-tight',
      borderColor: 'before:!border-blue-gray-200 after:!border-blue-gray-200',
    },
  },
}
