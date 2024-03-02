import { z } from 'zod'

import {
  createArticle,
  getAllArticles,
  getArticle,
  getArticleTotalCount,
} from '@/action/article'

import { procedure, router } from '../trpc'

export const articleRouter = router({
  getAll: procedure
    .input(z.union([z.string().array(), z.undefined()]))
    .query(({ input }) => getAllArticles(input)),
  getTotalCount: procedure.query(() => getArticleTotalCount()),
  get: procedure.input(z.string()).query(({ input }) => getArticle(input)),
  create: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.any().array(),
        category: z.string().array(),
      })
    )
    .query(({ input }) => createArticle(input)),
})
