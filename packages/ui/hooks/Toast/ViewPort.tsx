import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as Toast from '@radix-ui/react-toast'

import { twMerge } from 'tailwind-merge'

export const ToastViewport = forwardRef<
  ElementRef<typeof Toast.Viewport>,
  ComponentPropsWithoutRef<typeof Toast.Viewport>
>(({ className, ...props }, ref) => (
  <Toast.Viewport
    ref={ref}
    className={twMerge(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = Toast.Viewport.displayName
