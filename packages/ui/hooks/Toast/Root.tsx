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
        "bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut",
        className
      )}
      {...props}
    />
  )
})
ToastRoot.displayName = Toast.Root.displayName
