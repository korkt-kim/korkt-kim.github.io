import { experimental_nextHttpLink } from '@trpc/next/app-dir/links/nextHttp'
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server'
import superjson from 'superjson'

import { AppRouter } from '@/server'

//going through the HTTP endpoint.
export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        experimental_nextHttpLink({
          transformer: superjson,
          batch: true,
          url: '/api/trpc',
        }),
      ],
    }
  },
})
