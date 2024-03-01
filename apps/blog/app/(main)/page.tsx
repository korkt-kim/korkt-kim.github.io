import { getAllArticles } from '@/action/article'
import { ArticleList } from '@/features/List/ArticleList'
import { caller } from '../_trpc/serverClient'

export default async function Page() {
  const res = await caller.article.getAll()

  return <ArticleList articles={res.items} />
}
