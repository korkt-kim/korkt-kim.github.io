'use server'

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
  content,
  username,
  password,
  articleId,
}: CommentBody & { articleId: string }) {
  const res = await client.create(
    {
      _type: 'comment',
      content,
      username,
      password,
      relatedArticle: toReference(articleId),
    },
    {
      token: env('NEXT_PUBLIC_SANITY_ADMIN_TOKEN'),
    }
  )

  revalidateTag('comment')

  return JSON.stringify(res)
}

export async function deleteComment(commentId: string) {
  const res = await client.delete(commentId, {
    token: env('NEXT_PUBLIC_SANITY_ADMIN_TOKEN'),
  })

  revalidateTag('comment')

  return JSON.stringify(res)
}

const commentQueryKeys = {
  all: ['comment'],
  getMany: (articleId: string) => [
    ...commentQueryKeys.all,
    'getMany',
    articleId,
  ],
}
