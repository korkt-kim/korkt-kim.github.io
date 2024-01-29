'use client'

import { Flex, Input, Textarea, useToast } from '@zakelstorm/ui'
import { isNil, trim } from 'lodash-es'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import Skeleton from 'react-loading-skeleton'

import { createComment } from '@/action/comment'
import { FormButton } from '@/components/Form/FormButton'
import { useBreakPoint } from '@/hooks/useBreakPoint'
import { useCommentStore } from '@/store/commentStore'

export interface CreateCommentFormProps {
  articleId: string
}

export const CreateCommentForm = ({ articleId }: CreateCommentFormProps) => {
  const { toast } = useToast()
  const { username, password, setUsername, setPassword } = useCommentStore()

  const _createComment = async (_: string, formData: FormData) => {
    const [content, username, password, articleId] = [
      formData.get('content') as string,
      formData.get('username') as string,
      formData.get('password') as string,
      formData.get('articleId') as string,
    ]

    let res = ''
    try {
      res = await createComment({ content, username, password, articleId })
      setContent('')

      toast({
        title: 'Success',
        description: '댓글이 성공적으로 등록되었습니다.',
      })
    } catch {
      toast({ title: 'Error', description: '댓글 등록에 실패했습니다.' })
    }

    return res
  }
  const { breakPoint } = useBreakPoint()
  const [_, submitComment] = useFormState(_createComment, '')
  const [content, setContent] = useState('')

  if (!breakPoint) {
    return <CreateCommentFormSkeleton />
  }

  return (
    <form className='w-full' action={submitComment}>
      <Input
        containerProps={{ className: 'invisible' }}
        name='articleId'
        defaultValue={articleId}
      />

      <Flex direction={`${breakPoint === 'desktop' ? `h` : `v`}`}>
        <Flex direction='v'>
          <Input
            label='닉네임'
            type='text'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Input
            label='비밀번호'
            type='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Flex>
        <Textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          name='content'
          placeholder='타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영원칙 및 관련 법률에 제재를 받을 수 있습니다.'
        />
      </Flex>
      <Flex justify='end'>
        <FormButton
          type='submit'
          disabled={
            isNil(trim(username)) || isNil(password) || isNil(trim(content))
          }>
          등록
        </FormButton>
      </Flex>
    </form>
  )
}

const CreateCommentFormSkeleton = () => {
  return (
    <Flex className='sm:!flex-col md:!flex-row w-full'>
      <Flex className='w-[30%]' direction='v'>
        <Skeleton containerClassName='w-full' height={40} />
        <Skeleton containerClassName='w-full' height={40} />
      </Flex>
      <Skeleton containerClassName={'w-full block'} height={100} />
    </Flex>
  )
}
