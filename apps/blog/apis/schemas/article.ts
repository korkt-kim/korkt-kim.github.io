import { errorMessage } from './consts'
import { DocumentDefinition, PortableTextBlock, TypedObject } from 'sanity'

const articleDefinition: DocumentDefinition = {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required().max(50).error(errorMessage('title')),
    },
    {
      name: 'password',
      type: 'string',
      title: 'Password',
      validation: Rule =>
        Rule.required().max(20).error(errorMessage('password')),
      hidden: true,
      readOnly: true,
    },
    {
      name: 'content',
      type: 'array',
      of: [{ type: 'block' }],
      title: 'Content',
    },
    {
      name: 'category',
      type: 'array',
      of: [{ type: 'string' }],
      title: 'Category',
      validation: Rule => Rule.required(),
    },
  ],
}

export interface Article extends ArticleBody {
  _id: string
  _createdAt: string
  _rev: string
  _type: 'article'
  blockTweet: boolean
}

export type ArticleBody = {
  title: string
  password: string
  category: string[]
  content: PortableTextBlock[]
}

export default articleDefinition
