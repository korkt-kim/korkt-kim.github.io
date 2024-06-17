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

import { Date } from '@/components/ColumnRenderer/Date'
import { FormButton } from '@/components/Form/FormButton'
import { CommentResponse } from '@/types/comment'

export interface CommentListProps {
  contents: CommentResponse['items']
  deleteAction: (
    formData: FormData,
    contents: CommentResponse['items']
  ) => Promise<void>
}

// @TODO /Resource NotFound 공용 컴포넌트로 빼기
export const CommentList = ({ contents, deleteAction }: CommentListProps) => {
  const { toast } = useToast()
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState<string | undefined>()

  const submitDeleteComment = (formData: FormData) => {
    deleteAction(formData, contents)
      .then(() => {
        toast({
          title: 'Success',
          description: '댓글이 성공적으로 삭제되었습니다.',
        })
      })
      .catch(e => {
        if (e instanceof Error) {
          toast({
            title: 'Error',
            description: e.message ?? '댓글 삭제에 실패했습니다.',
          })
        }
      })
  }

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
            <div className='md:col-span-6 sm:col-span-6'>
              <Typo.Text className='break-all'>{content.content}</Typo.Text>
            </div>
            <div className='md:col-span-2 sm:col-span-4  text-end grid-cols-subgrid'>
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
                  <IconButton
                    className='shadow-none h-[24px] w-[24px]'
                    aria-controls='remove-comment-container'
                    aria-label='댓글 삭제하기'>
                    <TrashIcon strokeWidth={2} className='h-[16px] w-[16px]' />
                  </IconButton>
                </PopoverHandler>
                <PopoverContent className='p-2'>
                  <form
                    id='remove-comment-container'
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
                    <FormButton
                      type='submit'
                      className='h-[24px] w-[24px]'
                      isIcon>
                      <CheckCircleIcon className='h-[16px] w-[16px]' />
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
