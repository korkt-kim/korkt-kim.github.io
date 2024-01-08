import { notFound } from 'next/navigation'

import { getAllArticles } from '@/action/article'
import { CATEGORIES } from '@/consts'
import { ArticleList } from '@/features/Articles/List'

export async function generateStaticParams() {
  return CATEGORIES.map(category => ({
    category,
  }))
}

export default async function Page({
  params,
}: {
  params: { category: string }
}) {
  const { category } = params

  const _category = CATEGORIES.find(
    item => item.toLowerCase() === category.toLowerCase()
  )

  if (!_category) {
    notFound()
  }

  const res = await getAllArticles([_category])

  return <ArticleList articles={res.items} />
}
