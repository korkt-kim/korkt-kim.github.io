import { PortableText } from '@portabletext/react'
import { Flex, List, Typo } from '@zakelstorm/ui'

import { Article } from '@/apis/schemas/article'
import Calendar from '@/public/calendar.svg'
import Folder from '@/public/folder.svg'

export interface ArticleListProps {
  articles: Article[]
}

export const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <List>
      {articles.map((article, index) => {
        return (
          <List.Item
            className='border flex-col items-center gap-[16px] !px-[100px]'
            key={index}>
            <Flex gap={0} direction='v' align='center'>
              <Typo.Title level={1}>{article.title}</Typo.Title>
              <Typo.Text className='text-gray-400 text-sm flex items-center stroke-gray-500'>
                <Calendar className='text-transparent inline mx-[6px]' />
                Posted On {article._createdAt} |
                <Folder className='text-transparent inline mx-[6px]' /> In{' '}
                {article.category.join('/')}
              </Typo.Text>
            </Flex>
            <span className='w-full text-center [&>p]:truncate'>
              <PortableText value={[article.content?.[0]]} />
            </span>
            {/*@TODO: link 수정 */}
            <Typo.Link
              href='/'
              className='bg-black p-[10px] rounded text-white'>
              Read More
            </Typo.Link>
          </List.Item>
        )
      })}
    </List>
  )
}
