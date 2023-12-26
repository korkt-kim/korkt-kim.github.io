export const popoverStyle = {
  defaultProps: {
    placement: 'top',
    offset: 5,
    dismiss: {},
    animate: {
      unmount: {},
      mount: {},
    },
  },
  styles: {
    base: {
      bg: 'bg-white',
      p: 'p-4',
      border: 'border border-blue-gray-50',
      borderRadius: 'rounded-lg',
      boxShadow: 'shadow-lg shadow-blue-gray-500/10',
      fontFamily: 'font-sans',
      fontSize: 'text-sm',
      fontWeight: 'font-normal',
      color: 'text-blue-gray-500',
      outline: 'focus:outline-none',
      overflowWrap: 'break-words',
      whiteSpace: 'whitespace-normal',
    },
  },
} as const
