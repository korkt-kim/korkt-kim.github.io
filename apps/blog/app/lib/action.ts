import { sanityFetch } from '@/apis'
import { client } from '@/apis/client'
import {
  allArticlesQuery,
  articleQuery,
  paginatedArticleByCategoryQuery,
  paginatedArticleQuery,
} from '@/apis/groq'
import { Article } from '@/apis/schemas/article'

export async function getAllArticles() {
  return sanityFetch<Article[]>(client, {
    query: allArticlesQuery,
    params: {},
    tags: articleQueryKeys.all,
  })
}

export async function getArticle(id: string) {
  return sanityFetch(client, {
    query: articleQuery,
    params: {
      id,
    },
    tags: articleQueryKeys.all,
  })
}

export async function getPaginatedArticles(lastId: string) {
  return sanityFetch(client, {
    query: paginatedArticleQuery,
    params: {
      lastId,
    },
    tags: articleQueryKeys.all,
  })
}

export async function getPaginatedArticlesByCategoryId(
  categoryId: string,
  lastId: string
) {
  return sanityFetch(client, {
    query: paginatedArticleByCategoryQuery,
    params: {
      categoryId,
      lastId,
    },
    tags: articleQueryKeys.all,
  })
}

const articleQueryKeys = {
  all: ['article'],
}
