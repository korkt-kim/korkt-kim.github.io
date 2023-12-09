import { useContext } from 'react'

import { DesignTokenContext } from '../src/theme/context'

import { seedToken } from '../src/theme/tokens/seed'

export const useToken = () => {
  const context = useContext(DesignTokenContext)

  if (!context) {
    return { token: seedToken }
  }

  const merged = { ...context.token, ...context.override }

  return { token: merged }
}
