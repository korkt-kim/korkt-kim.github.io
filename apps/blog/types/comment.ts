import { Response } from './util'

export type CommentResponse = Response<Comment>

export interface Comment extends CommentBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'comment'
}

export type CommentBody = {
  content: string
  password: string
  username: string
}
