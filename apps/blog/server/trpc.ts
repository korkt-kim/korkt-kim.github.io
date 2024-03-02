import { experimental_createServerActionHandler } from '@trpc/next/app-dir/server'
import { initTRPC } from '@trpc/server'
import { headers } from 'next/headers'
import superjson from 'superjson'
import { ZodError } from 'zod'

import { Context } from './context'
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})
// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
