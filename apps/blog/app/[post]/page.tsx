import { Card } from '@zakelstorm/ui'
import { notFound } from 'next/navigation'

import { getAllArticles, getArticle } from '@/action/article'
import { PortableText } from '@/components/PortableText'
import { articleContainerId } from '@/consts'

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.items.map(article => ({
    post: article._id,
  }))
}

export default async function Page({ params }: { params: { post: string } }) {
  const { post } = params

  const article = await getArticle(post)

  if (!article) {
    notFound()
  }

  return (
    <Card title={article.title} className='w-full' id={articleContainerId}>
      <PortableText value={article.content} />
    </Card>
  )
}
