'use client'

import { Flex, List, ListProps, Typo } from '@zakelstorm/ui'
import { stagger, useAnimate, useInView } from 'framer-motion'
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
  const [scope, animate] = useAnimate<HTMLUListElement>()

  useEffect(() => {
    if (current === 0 || !scope.current) {
      return
    }

    animate([
      [
        'li',
        { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
        { delay: stagger(0.1), ease: 'easeInOut' },
      ],
    ])
  }, [animate, current, scope])

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
    <List data={articles} pagination={pagination} ref={scope}>
      {article => {
        return (
          <List.Item
            className='border flex-col items-center gap-16 opacity-0 blur-sm translate-y-[-10px]'
            key={article._id}>
            <Flex
              direction='v'
              align={breakPoint === 'desktop' ? 'center' : 'start'}>
              <Typo.Text className='text-21 break-all'>
                {article.title}
              </Typo.Text>

              <Flex
                gap='sm'
                noGap={breakPoint !== 'desktop'}
                className={`[&>*]:text-black [&>*]:text-sm [&_svg]:stroke-gray-500 sm:flex-col self-center`}>
                <Typo.Text>
                  <Calendar
                    role='presentation'
                    className='text-transparent inline mr-6'
                  />
                  Posted On <Date date={article._createdAt} />
                </Typo.Text>
                <Typo.Text className='sm:hidden' role='presentation'>
                  |
                </Typo.Text>
                <Link
                  href={`/category/${article.category?.[0]}`}
                  prefetch={false}>
                  <Folder
                    role='presentation'
                    className='text-transparent inline mr-6'
                  />{' '}
                  In {article.category!.join('/')}
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
