import { PortableTextBlock } from 'sanity'

import { Response } from './util'

export type ArticleResponse = Response<Article>
export interface Article extends ArticleBody {
  _id: string
  _createdAt: string
  _rev: string
  _type: 'article'
}

export type ArticleBody = {
  title: string
  password: string
  category: string[]
  content: PortableTextBlock[]
  description?: string
}
