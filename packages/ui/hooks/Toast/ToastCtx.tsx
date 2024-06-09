import { ToastProvider } from '@radix-ui/react-toast'
import { useToast } from './useToast'
import { ToastClose } from './Close'
import { ToastDescription } from './Description'
import { ToastRoot } from './Root'
import { ToastTitle } from './Title'
import { ToastViewport } from './ViewPort'

export function ToastCtx() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, ...props }) {
        return (
          <ToastRoot key={id} {...props}>
            <div className='grid gap-[4px]'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            <ToastClose />
          </ToastRoot>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
