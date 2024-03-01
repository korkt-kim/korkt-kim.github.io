import {
  createComment,
  deleteComment,
  getAllcommentsByArticleId,
} from '@/action/comment'
import { procedure, router } from '../trpc'
import { z } from 'zod'

export const commentRouter = router({
  getAllByArticleId: procedure
    .input(z.string())
    .query(({ input }) => getAllcommentsByArticleId(input)),

  delete: procedure
    .input(z.string())
    .mutation(({ input }) => deleteComment(input)),
  create: procedure
    .input(
      z.object({
        content: z.string(),
        username: z.string(),
        password: z.string(),
        articleId: z.string(),
      })
    )
    .mutation(({ input }) => createComment(input)),
})
