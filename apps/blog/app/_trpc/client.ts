import { AppRouter } from '@/server'

import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>({
  overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn()

        await opts.queryClient.invalidateQueries()
      },
    },
  },
})
