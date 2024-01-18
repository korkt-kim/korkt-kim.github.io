import { Flex, Typo } from '@zakelstorm/ui'

import {
  createComment,
  deleteComment,
  getAllcommentsByArticleId,
} from '@/action/comment'
import { CreateCommentForm } from '@/features/Comments/CreateCommentForm'
import { CommentList } from '@/features/Comments/List'

export default async function Page({ params }: { params: { post: string } }) {
  const { post } = params

  const comments = await getAllcommentsByArticleId(post)

  const _createComment = async (formData: FormData) => {
    'use server'

    await createComment({
      articleId: post,
      content: formData.get('content') as string,
      username: formData.get('name') as string,
      password: formData.get('password') as string,
    })
  }

  const _deleteComment = async (commentId: string) => {
    'use server'

    await deleteComment({
      commentId,
    })
  }

  return (
    <Flex direction='v' className='w-full'>
      <Flex justify='between' className='w-full'>
        <div>
          <Typo.Text>
            Comments <span className='text-red-500'>{comments.totalCount}</span>
            개
          </Typo.Text>
        </div>
        <Flex>
          <Typo.Link href='#container' className='text-black'>
            본문 보기
          </Typo.Link>
        </Flex>
      </Flex>
      <div className='w-full'>
        <CommentList contents={comments.items} onDelete={_deleteComment} />
      </div>
      <CreateCommentForm onSubmit={_createComment} />
    </Flex>
  )
}
