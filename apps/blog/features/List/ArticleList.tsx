'use client'

import { Flex, List, ListProps, Typo } from '@zakelstorm/ui'
import { isEmpty } from 'lodash-es'
import { Route } from 'next'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

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
  const searchParams = useSearchParams()
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  const pagination: ListProps<unknown>['pagination'] = useMemo(() => {
    const commonOption = {
      onChange: (page: number) => {
        setCurrent(page)
        router.push(`/?page=${page}`)
      },
      current,
    }
    if (breakPoint === 'desktop') {
      return commonOption
    }

    return {
      sectionSize: 3,
      ...commonOption,
    }
  }, [breakPoint, current, router])

  useEffect(() => {
    if (!searchParams.get('page') || isNaN(Number(searchParams.get('page')))) {
      router.replace(`?page=1`)
    }
  }, [searchParams, router])

  useEffect(() => {
    setCurrent(
      !searchParams.get('page') || isNaN(Number(searchParams.get('page')))
        ? 1
        : Number(searchParams.get('page'))
    )
  }, [router, searchParams])

  if (current === 0) {
    return null
  }

  if (isEmpty(articles)) {
    return (
      <Flex direction='v' align='center' className='py-200'>
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
            className='border flex-col items-center gap-16'
            key={article._id}>
            <Flex noGap direction='v' align='center'>
              <Typo.Text className='text-21'>{article.title}</Typo.Text>

              <Flex
                gap='sm'
                className={`[&>*]:text-black [&>*]:text-sm [&_svg]:stroke-gray-500 `}>
                <Typo.Text>
                  <Calendar className='text-transparent inline mx-6' />
                  Posted On <Date date={article._createdAt} />
                </Typo.Text>
                <Typo.Text>|</Typo.Text>
                <Link
                  href={`/category/${article.category?.[0]}`}
                  prefetch={false}>
                  <Folder className='text-transparent inline mr-6' /> In{' '}
                  {article.category!.join('/')}
                </Link>
              </Flex>
            </Flex>
            <span className='w-full text-center [&>p]:truncate'>
              {article.description}
            </span>
            <Link
              prefetch={false}
              href={`/${article._id}` as Route}
              className='bg-black p-10 rounded text-white'>
              Read Article
            </Link>
          </List.Item>
        )
      }}
    </List>
  )
}
