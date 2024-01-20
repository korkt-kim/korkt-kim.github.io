import { Flex, Typo } from '@zakelstorm/ui'

import { getAllcommentsByArticleId } from '@/action/comment'
import { CreateCommentForm } from '@/features/Form/CreateCommentForm'
import { CommentList } from '@/features/List/CommentList'

export default async function Page({ params }: { params: { post: string } }) {
  const { post: articleId } = params

  const comments = await getAllcommentsByArticleId(articleId)

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
        <CommentList contents={comments.items} />
      </div>
      <CreateCommentForm articleId={articleId} />
    </Flex>
  )
}
