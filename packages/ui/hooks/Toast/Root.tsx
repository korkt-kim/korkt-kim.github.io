import * as Toast from '@radix-ui/react-toast'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const ToastRoot = forwardRef<
  ElementRef<typeof Toast.Root>,
  ComponentPropsWithoutRef<typeof Toast.Root>
>(({ className, ...props }, ref) => {
  return (
    <Toast.Root
      ref={ref}
      className={twMerge(
        'bg-white group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
        className
      )}
      {...props}
    />
  )
})
ToastRoot.displayName = Toast.Root.displayName
