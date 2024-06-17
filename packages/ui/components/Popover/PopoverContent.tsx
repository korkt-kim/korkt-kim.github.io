'use client'

// @floating-ui
import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from '@floating-ui/react'
// utils
import classnames from 'classnames'
// framer-motion
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import { ComponentProps, FC, forwardRef, memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { recordValuesToString } from '../../util/recordValuesToString'
import { NewAnimatePresenceProps } from '../../util/type'
import { usePopover } from './PopoverContext'
// context
import { popoverStyle } from './theme'

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
