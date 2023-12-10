import React, { createContext } from 'react'

import { seedToken } from '../theme/tokens/seed'

export type AliasToken = typeof seedToken

export const defaultConfig = {
  token: seedToken,
  override: {},
}

export interface DesignTokenProviderProps {
  token: AliasToken
  override: Partial<AliasToken>
}

export const DesignTokenContext =
  createContext<DesignTokenProviderProps>(defaultConfig)
