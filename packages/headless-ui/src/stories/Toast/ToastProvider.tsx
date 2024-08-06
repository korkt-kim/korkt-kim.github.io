import {
  createContext,
  Dispatch,
  forwardRef,
  PropsWithChildren,
  useMemo,
  useRef,
} from 'react'

import {
  Placement,
  ToastController,
  ToastItemOption,
} from '../../components/Toast/type'
import { useToastGroup } from '../../components/Toast/useToastGroup'
import { Toast } from './Toast'

export interface ToastProviderProps {
  /**
   * Specifies pin-input value.
   */
  maxCount: number
  /**
   * Specifies pin-input value on init.
   */
  placement: Placement
  /**
   *
   */
  duration: number
}

export const ToastContext = createContext<{
  duration: number
  controller: Dispatch<ToastController>
  persistingPlacements: Placement[]
  toasts: ToastItemOption[]
} | null>(null)

export const ToastProvider = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<ToastProviderProps>
>((props, forwardedRef) => {
  const _ref = useRef<HTMLSpanElement>(null)
  const { duration, maxCount, placement } = props
  const { getGroupProps, getPlacements, state } = useToastGroup({
    duration,
    maxCount,
    placement,
    getRootNode: () =>
      forwardedRef && 'current' in forwardedRef
        ? forwardedRef?.current
        : _ref.current,
  })

  const value = useMemo(() => {
    return { ...state, ...state.state }
  }, [state])

  return (
    <ToastContext.Provider value={value}>
      <span ref={forwardedRef ?? _ref}>
        {props.children}
        {getPlacements().map(placement => {
          return (
            <div {...getGroupProps({ placement })} key={placement}>
              {state.state.toasts
                .filter(
                  toast => (toast.placement ?? state.placement) === placement
                )
                .map((toast, index) => (
                  <Toast
                    index={index}
                    key={toast.id}
                    toastId={toast.id}
                    type={toast.type}
                    title={toast.title}
                    duration={toast.duration}
                    description={toast.description}
                    placement={toast.placement}
                  />
                ))}
            </div>
          )
        })}
      </span>
    </ToastContext.Provider>
  )
})

ToastProvider.displayName = 'ToastProvider'
