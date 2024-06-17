import * as Toast from '@radix-ui/react-toast'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const ToastDescription = forwardRef<
  ElementRef<typeof Toast.Description>,
  ComponentPropsWithoutRef<typeof Toast.Description>
>(({ className, ...props }, ref) => (
  <Toast.Description
    ref={ref}
    className={twMerge('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = Toast.Description.displayName
