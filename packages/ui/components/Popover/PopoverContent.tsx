'use client'

// @floating-ui
import {
  FloatingPortal,
  FloatingFocusManager,
  useMergeRefs,
} from '@floating-ui/react'

// framer-motion
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'

// utils
import classnames from 'classnames'
import { twMerge } from 'tailwind-merge'

// context
import { popoverStyle } from './theme'
import { usePopover } from './PopoverContext'

import { recordValuesToString } from '../../util/recordValuesToString'
import { NewAnimatePresenceProps } from '../../util/type'
import { ComponentProps, FC, forwardRef, memo } from 'react'

export type PopoverContentProps = ComponentProps<'div'>

export const PopoverContent = memo(
  forwardRef<HTMLDivElement, PopoverContentProps>(
    ({ children, className, ...rest }, ref) => {
      const {
        defaultProps,
        styles: { base },
      } = popoverStyle
      const {
        open,
        strategy,
        x,
        y,
        context,
        floating,
        getFloatingProps,
        appliedAnimation,
        labelId,
        descriptionId,
      } = usePopover()

      // 3. set styles
      const popoverClasses = twMerge(
        classnames(recordValuesToString(base)),
        className
      )

      // 4. set refs
      const mergedRef = useMergeRefs([ref, floating])

      // 5. Create an instance of AnimatePresence because of the types issue with the children
      const NewAnimatePresence: FC<NewAnimatePresenceProps> = AnimatePresence

      // 6. return
      return (
        <LazyMotion features={domAnimation}>
          <FloatingPortal>
            <NewAnimatePresence>
              {open && (
                <FloatingFocusManager context={context}>
                  <m.div
                    {...getFloatingProps({
                      ...rest,
                      ref: mergedRef,
                      className: popoverClasses,
                      style: {
                        position: strategy,
                        top: y ?? '',
                        left: x ?? '',
                      },
                      'aria-labelledby': labelId,
                      'aria-describedby': descriptionId,
                    })}
                    initial='unmount'
                    exit='unmount'
                    animate={open ? 'mount' : 'unmount'}
                    variants={appliedAnimation}>
                    {children}
                  </m.div>
                </FloatingFocusManager>
              )}
            </NewAnimatePresence>
          </FloatingPortal>
        </LazyMotion>
      )
    }
  )
)

PopoverContent.displayName = 'PopoverContent'

export default PopoverContent
