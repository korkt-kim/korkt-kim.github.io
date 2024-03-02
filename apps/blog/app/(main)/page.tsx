import { ArticleList } from '@/features/List/ArticleList'

import { api } from '../_trpc/serverInvoker'

export default async function Page() {
  const res = await api.article.getAll.query()

  return <ArticleList articles={res.items} />
}
