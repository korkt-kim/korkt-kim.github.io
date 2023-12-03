import _axios from 'axios'

import { env } from '@/env'

export const http = _axios.create({
  baseURL: env('NEXT_PUBLIC_API_BASE_URL'),
  paramsSerializer: params => new URLSearchParams(params).toString(),
})
