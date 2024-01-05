import { DocumentDefinition } from 'sanity'
import { errorMessage } from './consts'

const commentDefinition: DocumentDefinition = {
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'Username',
      validation: Rule =>
        Rule.required().max(20).error(errorMessage('username')),
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
      type: 'text',
      title: 'Content',
      validation: Rule =>
        Rule.required().max(120).error(errorMessage('content')),
    },
    {
      name: 'relatedArticle',
      type: 'reference',
      title: 'RelatedArticle',
      to: [{ type: 'article' }],
    },
  ],
}

export default commentDefinition
