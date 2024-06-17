import * as Toast from '@radix-ui/react-toast'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const ToastViewport = forwardRef<
  ElementRef<typeof Toast.Viewport>,
  ComponentPropsWithoutRef<typeof Toast.Viewport>
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className={twMerge(
      '[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = Toast.Viewport.displayName
