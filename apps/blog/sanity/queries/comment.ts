import { groq } from 'next-sanity'

const type = 'comment'

export const allcommentsByArticleId = (query: { articleId: string }) => {
  const _query = `&& relatedArticle._ref=="${query?.articleId}"`

  return groq`{
      "items": *[_type=="${type}" ${_query}] | order(publishedAt desc, _createdAt desc) {
        title,
        category,
        content,
        _createdAt,
        _id
      },
      "totalCount": count(*[_type=="${type}" ${_query}])
    }`
}
