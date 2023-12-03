import { useMemo } from 'react'

import { createClient } from '@/apis'
import { http } from '@/apis/http'

export function useSDK() {
  return useMemo(() => createClient({ http }), [])
}
