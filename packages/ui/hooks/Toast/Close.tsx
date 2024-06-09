import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as Toast from '@radix-ui/react-toast'

import { twMerge } from 'tailwind-merge'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const ToastClose = forwardRef<
  ElementRef<typeof Toast.Close>,
  ComponentPropsWithoutRef<typeof Toast.Close>
>(({ className, ...props }, ref) => (
  <Toast.Close
    ref={ref}
    className={twMerge(
      'absolute right-[8px] top-[8px] rounded-md p-[4px] text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=''
    {...props}>
    <XMarkIcon className='h-[16px] w-[16px]' />
  </Toast.Close>
))
ToastClose.displayName = Toast.Close.displayName
