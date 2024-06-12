import { Flex, Typo } from '@zakelstorm/ui'

import { api } from '@/app/_trpc/serverInvoker'
import { articleContainerId } from '@/consts'
import { CreateCommentForm } from '@/features/Form/CreateCommentForm'
import { CommentList } from '@/features/List/CommentList'
import { CommentResponse } from '@/types/comment'

const createComment = async (formData: FormData) => {
  'use server'

  const [content, username, password, articleId] = [
    formData.get('content') as string,
    formData.get('username') as string,
    formData.get('password') as string,
    formData.get('articleId') as string,
  ]

  await api.comment.create.mutate({
    content,
    username,
    password,
    articleId,
  })

  await api.comment.getAllByArticleId.revalidate()
}

const deleteComment = async (
  formData: FormData,
  contents: CommentResponse['items']
) => {
  'use server'

  const commentId = formData.get('commentId') as string
  const _password = formData.get('password') as string

  if (!commentId) {
    throw new Error('Undefined Id')
  }

  if (
    _password !== contents.find(content => content._id === commentId)?.password
  ) {
    throw new Error('잘못된 비밀번호가 입력되었습니다.')
  }

  await api.comment.delete.mutate(commentId)

  await api.comment.getAllByArticleId.revalidate()
}

export default async function Page({ params }: { params: { post: string } }) {
  const { post: articleId } = params

  const comments = await api.comment.getAllByArticleId.query(articleId)

  return (
    <Flex direction='v' className='w-full'>
      <Flex justify='between' className='w-full'>
        <div>
          <Typo.Text>Comments {comments.totalCount}개</Typo.Text>
        </div>
        <Flex>
          <Typo.Link href={`#${articleContainerId}`} className='text-black'>
            본문 보기
          </Typo.Link>
        </Flex>
      </Flex>
      <div className='w-full'>
        <CommentList contents={comments.items} deleteAction={deleteComment} />
      </div>
      <CreateCommentForm articleId={articleId} createAction={createComment} />
    </Flex>
  )
}
