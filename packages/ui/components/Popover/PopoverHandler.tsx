// @floating-ui
import { useMergeRefs } from '@floating-ui/react'
import {
  cloneElement,
  ComponentProps,
  forwardRef,
  memo,
  ReactNode,
} from 'react'

// context
import { usePopover } from './PopoverContext'

export interface PopoverHandlerProps extends ComponentProps<any> {
  children: ReactNode | ComponentProps<any>
}

export const PopoverHandler = memo(
  forwardRef<HTMLDivElement, PopoverHandlerProps>(
    ({ children, ...rest }, ref) => {
      const { getReferenceProps, reference } = usePopover()

      const mergedRef = useMergeRefs([ref, reference])

      return cloneElement(children, {
        ...getReferenceProps({
          ...rest,
          ref: mergedRef,
        }),
      })
    }
  )
)

PopoverHandler.displayName = 'PopoverHandler'
