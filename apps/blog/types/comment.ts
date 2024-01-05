export interface Comment extends CommentBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'comment'
  blockTweet: boolean
  totalCount: number
}

export type CommentBody = {
  content: string
  password: string
  username: string
}
