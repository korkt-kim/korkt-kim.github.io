export const flexStyle = {
  defaultProps: {
    gap: 16,
    noGap: false,
    inline: false,
    direction: 'h',
    justify: 'start',
    align: 'start',
    flow: false,
  },
  styles: {
    base: {
      initial: {
        display: 'flex',
        flexDirection: 'flex-row',
      },
      inline: {
        display: 'inline-flex',
      },
      flow: {
        flexFlow: 'row-wrap',
      },
      noGap: {
        gap: 0,
      },
    },
    flexDirections: {
      h: {
        flexDirection: 'flex-row',
      },
      v: {
        flexDirection: 'flex-col',
      },
    },
  },
} as const
