import { useContext } from 'react'

import { ToastContext } from './ToastProvider'

export const useToastContext = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('Not in ToastProvider.')
  }

  return ctx
}
