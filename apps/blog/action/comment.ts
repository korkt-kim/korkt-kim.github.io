import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { sanityFetch } from '@/sanity'
import { client } from '@/sanity/client'
import { allcommentsByArticleId } from '@/sanity/queries/comment'

export async function getAllcommentsByArticleId(articleId: string) {
  return sanityFetch<Partial<Comment>[]>(client, {
    query: allcommentsByArticleId({ articleId }),
    params: {},
    tags: commentQueryKeys.all,
  })
}

export async function createComment(articleId: string) {
  const res = await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/api/comment`, {
    body: JSON.stringify({
      content: 'k',
      username: 'me',
      password: 'rnrn0808!!',
      relatedArticle: articleId,
    }),
    method: 'POST',
    cache: 'no-store',
  })

  const data = await res.json()
  revalidateTag('article')

  return JSON.stringify(data)
}

const commentQueryKeys = {
  all: ['article'],
  getMany: (articleId: string) => [
    ...commentQueryKeys.all,
    'getMany',
    articleId,
  ],
}
