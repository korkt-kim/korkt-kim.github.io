import { getAllArticles } from '@/action/article'
import { ArticleList } from '@/features/List/ArticleList'

export default async function Page() {
  const res = await getAllArticles()

  return <ArticleList articles={res.items} />
}
