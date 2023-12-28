'use client'

import { PortableText } from '@portabletext/react'
import { Flex, List, Typo } from '@zakelstorm/ui'
import { isEmpty } from 'lodash-es'

import { Article } from '@/apis/schemas/article'
import { formatDate } from '@/app/util/dayjs'
import Calendar from '@/public/calendar.svg'
import Folder from '@/public/folder.svg'

export interface ArticleListProps {
  articles: Partial<Article>[]
}
// @TODO
export const ArticleList = ({ articles }: ArticleListProps) => {
  if (isEmpty(articles)) {
    return (
      <Flex direction='v' align='center' className='p-200'>
        <Typo.Title>No Resource Found</Typo.Title>
        <Typo.Text>Could not find requested resource</Typo.Text>
      </Flex>
    )
  }

  return (
    <List data={articles} pagination>
      {article => {
        return (
          <List.Item
            className='border flex-col items-center gap-16 !px-100'
            key={article._id}>
            <Flex noGap direction='v' align='center'>
              <Typo.Title level={1}>{article.title}</Typo.Title>
              <div
                className={`[&>*]:text-gray-400 [&>*]:text-sm [&_svg]:stroke-gray-500 [&>*]:inline-flex [&>*]:items-center`}>
                <Typo.Text>
                  <Calendar className='text-transparent inline mx-6' />
                  Posted On {formatDate(article._createdAt!)} |
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
              href={`/category/${article.category?.[0]}/${article._id}`}
              className='bg-black p-10 rounded text-white'>
              Read More
            </Typo.Link>
          </List.Item>
        )
      }}
    </List>
  )
}
