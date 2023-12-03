import type { AxiosInstance } from 'axios'

export function createClient({ http }: { http: AxiosInstance }) {
  return { http }
}

export type APIClient = ReturnType<typeof createClient>
