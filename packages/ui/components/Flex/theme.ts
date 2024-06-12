export const flexStyle = {
  defaultProps: {
    gap: 'md',
    noGap: false,
    inline: false,
    direction: 'h',
    justify: 'start',
    align: 'start',
    wrap: false,
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
      wrap: {
        flexWrap: 'flex-wrap',
      },
      noGap: {
        gap: 'gap-0',
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
    gaps: {
      sm: {
        gap: 'gap-[8px]',
      },
      md: {
        gap: 'gap-[16px]',
      },
      lg: {
        gap: 'gap-[32px]',
      },
    },
    justifyContents: {
      start: { jusitfyContent: 'justify-start' },
      end: { jusitfyContent: 'justify-end' },
      center: { jusitfyContent: 'justify-center' },
      stretch: { jusitfyContent: 'justify-stretch' },
      normal: { jusitfyContent: 'justify-normal' },
      between: { jusitfyContent: 'justify-between' },
      around: { jusitfyContent: 'justify-around' },
      evenly: { jusitfyContent: 'justify-evenly' },
    },
    alignItems: {
      start: { alignItems: 'items-start' },
      end: { alignItems: 'items-end' },
      center: { alignItems: 'items-center' },
      baseline: { alignItems: 'items-baseline' },
      stretch: { alignItems: 'items-stretch' },
    },
  },
} as const
