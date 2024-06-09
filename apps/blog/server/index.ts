import { articleRouter } from './routes/article'
import { commentRouter } from './routes/comment'
import { router } from './trpc'

export const appRouter = router({
  article: articleRouter,
  comment: commentRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
