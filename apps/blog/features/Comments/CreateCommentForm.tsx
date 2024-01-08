'use client'

import { Button, Flex, Input, Textarea } from '@zakelstorm/ui'
import { useRef } from 'react'

export interface CreateCommentFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export const CreateCommentForm = ({ onSubmit }: CreateCommentFormProps) => {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className='w-full'
      action={async formData => {
        await onSubmit(formData)
        ref.current?.reset()
      }}
      ref={ref}>
      <Flex>
        <Flex direction='v'>
          <Input label='닉네임' type='text' name='name' />
          <Input label='비밀번호' type='password' name='password' />
        </Flex>
        <Textarea
          name='content'
          placeholder='타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영원칙 및 관련 법률에 제재를 받을 수 있습니다.'
        />
      </Flex>
      <Flex justify='end'>
        <Button type='submit'>등록</Button>
      </Flex>
    </form>
  )
}
