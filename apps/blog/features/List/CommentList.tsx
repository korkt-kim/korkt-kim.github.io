'use client'

import { CheckCircleIcon, TrashIcon } from '@heroicons/react/16/solid'
import {
  IconButton,
  Input,
  List,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typo,
  useToast,
} from '@zakelstorm/ui'
import { useState } from 'react'
import { useFormState } from 'react-dom'

import { deleteComment } from '@/action/comment'
import { Date } from '@/components/ColumnRenderer/Date'
import { FormButton } from '@/components/Form/FormButton'
import { CommentResponse } from '@/types/comment'

export interface CommentListProps {
  contents: CommentResponse['items']
}
// @TODO /Resource NotFound 공용 컴포넌트로 빼기
export const CommentList = ({ contents }: CommentListProps) => {
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState<string | undefined>()

  const _deleteComment = async (_: string, formData: FormData) => {
    const commentId = formData.get('commentId') as string
    const _password = formData.get('password') as string

    let res = ''
    try {
      if (!commentId) {
        throw new Error('Undefined Id')
      }
      if (
        _password !==
        contents.find(content => content._id === commentId)?.password
      ) {
        throw new Error('잘못된 비밀번호가 입력되었습니다.')
      }

      res = await deleteComment({ commentId })
      toast({
        title: 'Success',
        description: '댓글이 성공적으로 삭제되었습니다.',
      })
    } catch (e: any) {
      toast({
        title: 'Error',
        description: e.message ?? '댓글 삭제에 실패했습니다.',
      })
    }

    return res
  }

  const [_, submitDeleteComment] = useFormState(_deleteComment, '')

  return (
    <List data={contents} pagination>
      {content => {
        return (
          <List.Item
            className='border md:text-11 sm:text-9 grid md:grid-cols-9 sm:grid-cols-12 items-center md:gap-16 sm:gap-4 md:!pr-40 sm:!pr-28 relative'
            key={content._id}>
            <div className='md:col-span-1 sm:col-span-2'>
              <Typo.Text className='break-all'>{content.username}</Typo.Text>
            </div>
            <div className='md:col-span-7 sm:col-span-6'>
              <Typo.Text className='break-all'>{content.content}</Typo.Text>
            </div>
            <div className='md:col-span-1 sm:col-span-4  text-end grid-cols-subgrid  text-gray-400'>
              <Date date={content._createdAt} />
            </div>
            <div className='absolute right-10'>
              <Popover
                open={open === content._id}
                handler={isOpen => {
                  setOpen(isOpen ? content._id : undefined)
                  setPassword('')
                }}
                placement='bottom-end'>
                <PopoverHandler>
                  <IconButton className='shadow-none h-6 w-6'>
                    <TrashIcon strokeWidth={2} className='h-4 w-4' />
                  </IconButton>
                </PopoverHandler>
                <PopoverContent className='p-2'>
                  <form
                    className='flex gap-0 items-center'
                    action={submitDeleteComment}>
                    <Input
                      defaultValue={content._id}
                      name='commentId'
                      containerProps={{ className: 'hidden' }}
                    />
                    <Input
                      name='password'
                      value={password}
                      label='password'
                      className='!h-30 !text-10'
                      containerProps={{
                        className: '!h-30 !min-w-[100px] !max-w-[100px]',
                      }}
                      labelProps={{ className: '!text-11' }}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <FormButton type='submit' className='h-6 w-6' isIcon>
                      <CheckCircleIcon className='h-4 w-4' />
                    </FormButton>
                  </form>
                </PopoverContent>
              </Popover>
            </div>
          </List.Item>
        )
      }}
    </List>
  )
}
