import { groq } from 'next-sanity'

export const allArticlesQuery = groq`
    *[_type=="article"] | order(publishedAt desc, _createdAt desc) {
        title,
        category,
        content,
        _createdAt,
    }
`
export const articleQuery = groq`
    *[_type=="article" && _id==$id]  {
        title,
        category,
        content,
        "relatedComments": *[_type=='comment' && references(^._id)] | order(publishedAt desc, _createdAt desc) {
            username,
            content
        }
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
