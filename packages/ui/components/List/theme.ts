export interface ListStylesType {
  defaultProps?: object
  styles?: {
    base?: {
      list?: object
      item?: {
        initial?: object
        selected?: object
        disabled?: object
      }
      itemPrefix?: object
      itemSuffix?: object
    }
  }
}

export const listStyle = {
  defaultProps: {},
  styles: {
    base: {
      list: {
        display: 'flex',
        flexDirection: 'flex-col',
        gap: 'gap-[4px]',
        minWidth: 'min-w-[240px]',
        p: 'p-[8px]',
        fontFamily: 'font-sans',
        fontSize: 'text-base',
        fontWeight: 'font-normal',
        color: 'text-blue-gray-700',
      },
      item: {
        initial: {
          display: 'flex',
          alignItems: 'items-center',
          width: 'w-full',
          padding: 'p-[12px]',
          borderRadius: 'rounded-lg',
          textAlign: 'text-start',
          lightHeight: 'leading-tight',
          transition: 'transition-all',
          bg: 'hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80',
          color:
            'hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900',
          outline: 'outline-none',
        },
        selected: {
          bg: 'bg-blue-gray-50/50',
          color: 'text-blue-gray-700',
        },
        disabled: {
          opacity: 'opacity-50',
          cursor: 'cursor-not-allowed',
          pointerEvents: 'pointer-events-none',
          userSelect: 'select-none',
          bg: 'hover:bg-transparent focus:bg-transparent active:bg-transparent',
          color:
            'hover:text-blue-gray-500 focus:text-blue-gray-500 active:text-blue-gray-500',
        },
      },
      itemPrefix: {
        display: 'grid',
        placeItems: 'place-items-center',
        marginRight: 'mr-[16px]',
      },
      itemSuffix: {
        display: 'grid',
        placeItems: 'place-items-center',
        marginRight: 'ml-auto justify-self-end',
      },
    },
  },
} as const
