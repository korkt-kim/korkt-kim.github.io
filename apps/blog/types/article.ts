import { PortableTextBlock } from 'sanity'

export interface Article extends ArticleBody {
  _id: string
  _createdAt: string
  _rev: string
  _type: 'article'
  blockTweet: boolean
  totalCount: number
}

export type ArticleBody = {
  title: string
  password: string
  category: string[]
  content: PortableTextBlock[]
}
