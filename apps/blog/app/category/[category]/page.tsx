import { notFound } from 'next/navigation'

import { ArticleList } from '@/app/features/Articles/List'
import { getAllArticles } from '@/app/lib/action'
import { CATEGORIES } from '@/consts'

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

  const _category = CATEGORIES.find(item => item.toLowerCase() === category)

  if (!_category) {
    notFound()
  }

  const res = await getAllArticles([_category])

  return <ArticleList articles={res} />
}
