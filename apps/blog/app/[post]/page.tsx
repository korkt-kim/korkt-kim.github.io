import { Card } from '@zakelstorm/ui'
import { isArray } from 'lodash-es'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { isPortableTextSpan, PortableTextBlock } from 'sanity'

import { getAllArticles, getArticle } from '@/action/article'
import { PortableText } from '@/components/PortableText'
import { articleContainerId } from '@/consts'

interface Props {
  params: { post: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { post } = params

  // fetch data
  const article = await getArticle(post)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  const getText = (content: PortableTextBlock[]) => {
    if (!isArray(content)) {
      return ''
    }
    const stringArr = content.reduce((acc, item) => {
      if (isPortableTextSpan(item)) {
        acc.push(item.text)
      } else if (item.children) {
        acc.push(getText(item.children as PortableTextBlock[]))
      }
      return acc
    }, [] as string[])

    return stringArr.join(',')
  }
  const title = article.title
  const description = getText(article.content)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: previousImages,
    },
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()

  return articles.items.map(article => ({
    post: article._id,
  }))
}

export default async function Page({ params }: Props) {
  const { post } = params

  const article = await getArticle(post)

  if (!article) {
    notFound()
  }

  return (
    <article>
      <Card title={article.title} className='w-full' id={articleContainerId}>
        <PortableText value={article.content} />
      </Card>
    </article>
  )
}
