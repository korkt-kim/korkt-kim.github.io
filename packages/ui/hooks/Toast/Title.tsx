import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as Toast from '@radix-ui/react-toast'

import { twMerge } from 'tailwind-merge'

export const ToastTitle = forwardRef<
  ElementRef<typeof Toast.Title>,
  ComponentPropsWithoutRef<typeof Toast.Title>
>(({ className, ...props }, ref) => (
  <Toast.Title
    ref={ref}
    className={twMerge('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = Toast.Title.displayName
