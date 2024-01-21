'use client'

import { Flex, Spinner, Typo, useIntersectionObserver } from '@zakelstorm/ui'
import { unescape } from 'lodash-es'
import { useEffect, useMemo, useRef, useState } from 'react'

import { Sidebar, SidebarProps } from '@/components/Sidebar'
import { articleContainerId } from '@/consts'

export type ArticleSidebarProps = SidebarProps

export const ArticleSidebar = (props: SidebarProps) => {
  const [articleContainer, setArticleContainer] = useState<Element | null>(null)
  const [active, setActive] = useState(-1)
  const [subTitleRefs, setSubTitleRefs] = useState<HTMLElement[]>([])
  const options = useRef({
    root: null,
    rootMargin: '0px',
    threshold: 1,
  })

  const intersections = useIntersectionObserver(subTitleRefs, options.current)

  useEffect(() => {
    const articleContainer = document.querySelector(`#${articleContainerId}`)
    setArticleContainer(articleContainer)
    if (articleContainer) {
      setSubTitleRefs(
        Array.from(
          articleContainer.querySelectorAll(`#${articleContainerId}>h2`)
        )
      )
    }
  }, [])

  useEffect(() => {
    intersections?.forEach(intersection => {
      if (intersection.isIntersecting) {
        const index = subTitleRefs.findIndex(
          subTitleRef => subTitleRef === intersection.target
        )
        setActive(index)
      }
    })
  }, [intersections, subTitleRefs])

  const scrollToSubTitle = (index: number) => {
    if (!articleContainer) {
      return
    }

    articleContainer
      .querySelectorAll(`#${articleContainerId}>h2`)
      [index].scrollIntoView()
  }

  return (
    <Sidebar {...props}>
      <Typo.Title level={4} className='mb-20 text-center'>
        Table of Contents
      </Typo.Title>
      {articleContainer ? (
        <ol className='list-decimal text-12 pl-20'>
          {Array.from(
            articleContainer.querySelectorAll(`#${articleContainerId}>h2`)
          )
            .map(item => item.innerHTML)
            .map((subTitle, index) => {
              return (
                <li
                  key={index}
                  onClick={() => scrollToSubTitle(index)}
                  style={{ marginBlockStart: 5 }}
                  className={`hover:underline hover:cursor-pointer ${
                    active === index ? `text-blue-400` : ``
                  }`}>
                  <Typo.Text>{unescape(subTitle)}</Typo.Text>
                </li>
              )
            })}
        </ol>
      ) : (
        <Flex justify='center'>
          <Spinner />
        </Flex>
      )}
    </Sidebar>
  )
}
