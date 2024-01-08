import { revalidateTag } from 'next/cache'

import { env } from '@/env'
import { sanityFetch } from '@/sanity'
import { client } from '@/sanity/client'
import { allcommentsByArticleId } from '@/sanity/queries/comment'
import { CommentBody, CommentResponse } from '@/types/comment'

import { toReference } from './util'

export async function getAllcommentsByArticleId(articleId: string) {
  return sanityFetch<CommentResponse>(client, {
    query: allcommentsByArticleId({ articleId }),
    params: {},
    tags: commentQueryKeys.all,
  })
}

export async function createComment({
  articleId,
  content,
  password,
  username,
}: CommentBody & { articleId: string }) {
  const res = await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/api/comment`, {
    body: JSON.stringify({
      content,
      username,
      password,
      relatedArticle: toReference(articleId),
    }),
    method: 'POST',
    cache: 'no-store',
  })

  const data = await res.json()
  revalidateTag('comment')

  return JSON.stringify(data)
}

const commentQueryKeys = {
  all: ['comment'],
  getMany: (articleId: string) => [
    ...commentQueryKeys.all,
    'getMany',
    articleId,
  ],
}
