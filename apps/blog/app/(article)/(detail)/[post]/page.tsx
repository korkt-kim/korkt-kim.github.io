import { Card } from '@zakelstorm/ui'
import { notFound } from 'next/navigation'

import { getAllArticles, getArticle } from '@/action/article'
import { getAllcommentsByArticleId } from '@/action/comment'
import { PortableText } from '@/components/PortableText/WrappedPortableText'
import { CATEGORIES } from '@/consts'

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.map(article => ({
    post: article._id,
  }))
}

export default async function Page({ params }: { params: { post: string } }) {
  const { post } = params

  const article = await getArticle(post)

  if (!article) {
    notFound()
  }

  const comments = await getAllcommentsByArticleId(article._id)

  return (
    <Card title={article.title}>
      <PortableText value={article.content} />
    </Card>
  )
}
