/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assign } from 'lodash-es'
import { CSSProperties } from 'react'

import { Placement, ToastItemState } from './type'

export const getToastItemStyle = ({
  index,
  placement,
  state,
  firstNodeHeight,
  height,
  offset,
}: {
  index: number
  placement: Placement
  state: ToastItemState
  firstNodeHeight: number
  height: number
  offset: number
}) => {
  const style: CSSProperties & Record<string, string | number | undefined> = {
    '--index': index,
    height: 'auto',
    '--scale': 'calc(-1 * var(--index) * 0.05 + 1)',
    '--initialHeight': height,
  }

  const side = placement.split('-')[0] as 'top' | 'bottom'

  if (side === 'top') {
    assign(style, {
      top: '0',
      '--y': '-100%',
      '--lift': '1',
    })
  } else if (side === 'bottom') {
    assign(style, {
      bottom: '0',
      '--y': '100%',
      '--lift': '-1',
    })
  }

  if (state === 'visible') {
    assign(style, {
      height: index === 0 ? 'auto' : firstNodeHeight,
      '--y': `calc(var(--lift-amount) * var(--index))`,
    })
  }

  if (state === 'persisting') {
    assign(style, {
      '--y':
        side === 'top'
          ? `calc(${offset}px + (var(--gap) * var(--index)))`
          : `calc(-${offset}px - (var(--gap) * var(--index)))`,
      '--scale': 1,
    })
  }

  if (state === 'unmounted') {
    assign(style, {
      '--y':
        side === 'top'
          ? 'calc(-100% - max(env(safe-area-inset-top, 0px), 24px))'
          : 'calc(100% + max(env(safe-area-inset-bottom, 0px), 24px))',
    })
  }

  return style
}
