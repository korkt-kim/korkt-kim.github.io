import { experimental_nextCacheLink } from '@trpc/next/app-dir/links/nextCache'
import { experimental_createTRPCNextAppDirServer } from '@trpc/next/app-dir/server'
import superjson from 'superjson'

import { appRouter } from '@/server'

/**
 * invokes the procedure directly on the server,
 * without going through the HTTP endpoint.
 */

export const api = experimental_createTRPCNextAppDirServer<typeof appRouter>({
  config() {
    return {
      links: [
        experimental_nextCacheLink({
          // requests are cached for 5 seconds
          // revalidate: 5,
          router: appRouter,
          transformer: superjson,
          createContext: async () => {
            return {
              headers: {
                'x-trpc-source': 'rsc-invoke',
              },
            }
          },
        }),
      ],
    }
  },
})
