import { PortableText } from '@portabletext/react'
import { Card } from '@zakelstorm/ui'
import { notFound } from 'next/navigation'

import { getAllArticles, getArticle } from '@/app/lib/action'
import { CATEGORIES } from '@/consts'

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map(article => ({
    category: article.category?.[0],
    post: article._id,
  }))
}

export default async function Page({
  params,
}: {
  params: { category: string; post: string }
}) {
  const { post, category } = params

  const _category = CATEGORIES.find(
    c => c.toLocaleLowerCase() === category.toLocaleLowerCase()
  )

  if (!_category) {
    notFound()
  }

  const allArticles = await getAllArticles([_category])
  const article = await getArticle(post)

  if (!(article && allArticles.map(item => item._id).includes(article._id))) {
    notFound()
  }

  return (
    <Card title={article.title}>
      <PortableText value={article.content} />
    </Card>
  )
}
