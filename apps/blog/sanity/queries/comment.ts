import { groq } from 'next-sanity'

const type = 'comment'

export const allcommentsByArticleId = (query: { articleId: string }) => {
  const _query = `&& relatedArticle._ref=="${query?.articleId}"`

  return groq`
    *[_type=="${type}" ${_query}] 
  `
}
