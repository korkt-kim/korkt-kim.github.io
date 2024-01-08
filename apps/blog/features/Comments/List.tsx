'use client'

import { Flex, List, Typo } from '@zakelstorm/ui'

import { Date } from '@/components/ColumnRenderer/Date'
import { CommentResponse } from '@/types/comment'

export interface CommentListProps {
  contents: CommentResponse['items']
}
// @TODO /Resource NotFound 공용 컴포넌트로 빼기
export const CommentList = ({ contents }: CommentListProps) => {
  return (
    <List data={contents} pagination>
      {content => {
        return (
          <List.Item
            className='border flex-col items-center gap-16 !px-100'
            key={content._id}>
            <Flex align='baseline'>
              <div>
                <Typo.Text className='text-ellipsis overflow-hidden'>
                  {content.username}
                </Typo.Text>
              </div>
              <div>
                <Typo.Text className='break-all'>{content.content}</Typo.Text>
              </div>
              <div>
                <Date date={content._createdAt} />
              </div>
            </Flex>
          </List.Item>
        )
      }}
    </List>
  )
}
