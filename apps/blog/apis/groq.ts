import { groq } from 'next-sanity'

export const allArticlesQuery = (query?: { category?: string[] }) => {
  const _query = `${query?.category ? '&&' : ''} ${(query?.category ?? [])
    .map(item => `'${item}' in category`)
    .join('&&')}`

  return groq`
    *[_type=="article" ${_query}] | order(publishedAt desc, _createdAt desc) {
        title,
        category,
        content,
        _createdAt,
        _id,
        "totalCount": count(*[_type=="article" ${_query}])
    }
`
}

export const allArticleTotalCount = () => {
  return groq`
    count(*[_type=="article" ])
  `
}

export const articleQuery = groq`
    *[_type=="article" && _id==$id]  {
        title,
        category,
        content,
        _id,
        _createdAt,
    }
`

export const paginatedArticleQuery = groq`
    *[_type == "article" && _id > $lastId] | order(publishedAt desc, _createdAt desc) [0...100] {
        title,
        category
    }
`

export const paginatedArticleByCategoryQuery = groq`
    *[_type == "article" && _id > $lastId && count(category[@ in ^.category]) > 0] | order(publishedAt desc, _createdAt desc) [0...100] {
        title,
        category
    }
`
