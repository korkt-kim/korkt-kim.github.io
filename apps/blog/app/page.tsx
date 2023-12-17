import { Spinner } from '@zakelstorm/ui'

import { ArticleList } from './features/Articles/List'
import { getAllArticles } from './lib/action'

export default async function Page() {
  const res = await getAllArticles()

  return <ArticleList articles={res} />
}
