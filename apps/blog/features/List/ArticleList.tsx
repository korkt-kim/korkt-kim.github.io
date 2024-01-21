'use client'

import { PortableText } from '@portabletext/react'
import { Flex, List, ListProps, Typo, useWindowSize } from '@zakelstorm/ui'
import { PaginationProps } from '@zakelstorm/ui/components/Pagination'
import { isEmpty } from 'lodash-es'
import { useMemo } from 'react'

import { Date } from '@/components/ColumnRenderer/Date'
import { useBreakPoint } from '@/hooks/useBreakPoint'
import Calendar from '@/public/calendar.svg'
import Folder from '@/public/folder.svg'
import { ArticleResponse } from '@/types/article'

export interface ArticleListProps {
  articles: ArticleResponse['items']
}
// @TODO
export const ArticleList = ({ articles }: ArticleListProps) => {
  const { breakPoint } = useBreakPoint()
  const pagination: ListProps<unknown>['pagination'] = useMemo(() => {
    if (breakPoint === 'desktop') {
      return true
    }

    return {
      sectionSize: 3,
    }
  }, [breakPoint])
  if (isEmpty(articles)) {
    return (
      <Flex direction='v' align='center' className='p-200'>
        <Typo.Title>No Resource Found</Typo.Title>
        <Typo.Text>Could not find requested resource</Typo.Text>
      </Flex>
    )
  }

  return (
    <List data={articles} pagination={pagination}>
      {article => {
        return (
          <List.Item
            className='border flex-col items-center gap-16 md:!px-100 sm:!px-10'
            key={article._id}>
            <Flex noGap direction='v' align='center'>
              <Typo.Title level={1}>{article.title}</Typo.Title>
              <div
                className={`[&>*]:text-gray-400 [&>*]:text-sm [&_svg]:stroke-gray-500 [&>*]:inline-flex [&>*]:items-center`}>
                <Typo.Text>
                  <Calendar className='text-transparent inline mx-6' />
                  Posted On <Date date={article._createdAt} /> |
                </Typo.Text>
                <Typo.Link href={`/category/${article.category?.[0]}`}>
                  <Folder className='text-transparent inline mx-6' /> In{' '}
                  {article.category!.join('/')}
                </Typo.Link>
              </div>
            </Flex>
            <span className='w-full text-center [&>p]:truncate'>
              {article.content && (
                <PortableText value={[article.content?.[0]]} />
              )}
            </span>
            {/*@TODO: link 수정 */}
            <Typo.Link
              href={`/${article._id}`}
              className='bg-black p-10 rounded text-white'>
              Read More
            </Typo.Link>
          </List.Item>
        )
      }}
    </List>
  )
}
