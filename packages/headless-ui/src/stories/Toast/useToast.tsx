import { useMemo } from 'react'

import { ToastController } from '../../components/Toast/type'
import { useToastContext } from './useToastContext'

export const useToast = () => {
  const ctx = useToastContext()

  return useMemo(
    () => ({
      open: (option: Extract<ToastController, { type: 'OPEN' }>['option']) =>
        ctx.controller({ type: 'OPEN', option }),
    }),
    [ctx]
  )
}
