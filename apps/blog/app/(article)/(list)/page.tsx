import { getAllArticles } from '@/action/article'
import { ArticleList } from '@/features/Articles/List'

export default async function Page() {
  const res = await getAllArticles()

  return <ArticleList articles={res} />
}
