'use client'

import { Flex, Input, Textarea, useToast } from '@zakelstorm/ui'
import { useState } from 'react'
import { useFormState } from 'react-dom'

import { createComment } from '@/action/comment'
import { FormButton } from '@/components/Form/FormButton'
import { useBreakPoint } from '@/hooks/useBreakPoint'

export interface CreateCommentFormProps {
  articleId: string
}

export const CreateCommentForm = ({ articleId }: CreateCommentFormProps) => {
  const { toast } = useToast()

  const _createComment = async (_: string, formData: FormData) => {
    const [content, username, password, articleId] = [
      formData.get('content') as string,
      formData.get('name') as string,
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
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

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
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
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
        <FormButton type='submit' disabled={!name || !password || !content}>
          등록
        </FormButton>
      </Flex>
    </form>
  )
}
