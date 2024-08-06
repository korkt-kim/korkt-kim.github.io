import '../../styles/Toast.css'

import { forwardRef, useRef } from 'react'
import { HiX } from 'react-icons/hi'

import { useToastItem } from '../../components'
import { Placement, Type } from '../../components/Toast/type'
import { useToastContext } from './useToastContext'

export interface ToastProps {
  // @TODO: 설명 수정
  /**
   * Specifies pin-input value.
   */
  toastId: string
  /**
   *
   */
  index: number
  /**
   * The function to call when the pin-input value changes.
   */
  type: Type
  /**
   * on
   */
  duration: number
  /**
   *
   */
  placement: Placement
  /**
   * Specifies whether the pin-input is disabled.
   */
  title?: string
  /**
   * The name attribute of the pin-input, used to identify the form data after submission.
   */
  description?: string
}

export const Toast = forwardRef<HTMLSpanElement, ToastProps>(
  (props, forwardedRef) => {
    const {
      controller,
      duration: defaultDuration,
      persistingPlacements,
    } = useToastContext()

    const { index, placement, duration, toastId, type } = props

    const _ref = useRef<HTMLSpanElement>(null)
    const api = useToastItem({
      controller,
      defaultDuration,
      persistingPlacements,
      type,
      toastId,
      duration,
      placement,
      index,

      getRootNode: () =>
        forwardedRef && 'current' in forwardedRef
          ? forwardedRef?.current
          : _ref.current,
    })

    return (
      <>
        <span {...api.getRootProps()} ref={forwardedRef ?? _ref}>
          <div {...api.getTitleProps()}>{props.title}</div>
          <div {...api.getDescriptionProps()}>{props.description}</div>
          <button {...api.getCloseProps()}>
            <HiX />
          </button>
        </span>
      </>
    )
  }
)

Toast.displayName = 'Toast'
