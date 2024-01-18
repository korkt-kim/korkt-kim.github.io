'use client'

import {
  Dispatch,
  PropsWithChildren,
  Ref,
  useEffect,
  useMemo,
  useState,
} from 'react'

// @floating-ui
import {
  offset as fuiOffset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  Placement,
  UseDismissProps,
} from '@floating-ui/react'

// utils
import { merge } from 'lodash-es'

// context
import { popoverStyle } from './theme'
import { PopoverContextProvider, usePopover } from './PopoverContext'

// popover components
import { PopoverHandler, PopoverHandlerProps } from './PopoverHandler'
import { PopoverContent, PopoverContentProps } from './PopoverContent'
import { Animation } from '../../util/type'

export interface PopoverProps extends PropsWithChildren {
  open?: boolean
  handler?: (isOpen: boolean) => void
  placement?: Placement
  offset?:
    | number
    | {
        mainAxis?: number
        crossAxis?: number
        alignmentAxis?: number | null
      }
  dismiss?: UseDismissProps
  animate?: Animation
}

const Popover = ({
  open,
  handler,
  placement,
  offset,
  dismiss,
  animate,
  children,
}: PopoverProps) => {
  // 1. init
  const { defaultProps } = popoverStyle
  const [internalOpen, setInternalOpen] = useState(false)

  // 2. set default props
  open = open ?? internalOpen
  handler = handler ?? setInternalOpen
  placement = placement ?? defaultProps.placement
  offset = offset ?? defaultProps.offset
  dismiss = dismiss ?? defaultProps.dismiss
  animate = animate ?? defaultProps.animate

  // 4. set animation
  const animation = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  }
  const appliedAnimation = merge(animation, animate)

  const { x, y, strategy, refs, update, context } = useFloating<HTMLDivElement>(
    {
      open,
      onOpenChange: handler,
      middleware: [fuiOffset(offset), flip(), shift()],
      placement,
    }
  )
  const reference = refs.reference as Ref<HTMLDivElement> | null
  const floating = refs.floating as Ref<HTMLDivElement> | null

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, dismiss),
  ])

  useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update)
    }
  }, [open, update, refs.reference, refs.floating])

  const contextValue = useMemo(
    () => ({
      open,
      strategy,
      x,
      y,
      context,
      reference,
      floating,
      getReferenceProps,
      getFloatingProps,
      appliedAnimation,
      labelId,
      descriptionId,
    }),
    [
      open,
      strategy,
      x,
      y,
      context,
      reference,
      floating,
      getFloatingProps,
      getReferenceProps,
      appliedAnimation,
      labelId,
      descriptionId,
    ]
  )

  return (
    <PopoverContextProvider value={contextValue}>
      {children}
    </PopoverContextProvider>
  )
}

Popover.displayName = 'Popover'

export type { PopoverHandlerProps, PopoverContentProps }
export { Popover, PopoverHandler, PopoverContent, usePopover }
export default Object.assign(Popover, {
  Handler: PopoverHandler,
  Content: PopoverContent,
})
