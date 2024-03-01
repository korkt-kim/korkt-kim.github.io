import { router } from './trpc'
import { articleRouter } from './routes/article'
import { commentRouter } from './routes/comment'

export const appRouter = router({
  article: articleRouter,
  comment: commentRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
