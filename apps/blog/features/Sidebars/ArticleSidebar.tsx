'use client'

import { Flex, Spinner, Typo } from '@zakelstorm/ui'
import { unescape } from 'lodash-es'
import { useCallback, useEffect, useRef, useState } from 'react'

import { articleContainerId } from '@/consts'

import { SidebarWrapper } from './SidebarWrapper'

export const ArticleSidebar = () => {
  const [articleContainer, setArticleContainer] = useState<Element | null>(null)
  const [active, setActive] = useState(0)
  const [subTitleRefs, setSubTitleRefs] = useState<HTMLElement[]>([])

  const setActiveSubtitle = useCallback((refs: HTMLElement[]) => {
    setActive(
      refs.reduce((acc, item, index) => {
        if (item.offsetTop <= window.scrollY + 5) {
          acc = index
        }
        return acc
      }, 0)
    )
  }, [])

  useEffect(() => {
    const articleContainer = document.querySelector(`#${articleContainerId}`)
    setArticleContainer(articleContainer)
    if (articleContainer) {
      const subTitleRefs = Array.from(
        articleContainer.querySelectorAll(`#${articleContainerId}>h2`)
      ) as HTMLElement[]
      setSubTitleRefs(subTitleRefs)

      setActiveSubtitle(subTitleRefs)
    }
  }, [setActiveSubtitle])

  useEffect(() => {
    document.addEventListener('scroll', () => setActiveSubtitle(subTitleRefs))
    return () => {
      return document.removeEventListener('scroll', () =>
        setActiveSubtitle(subTitleRefs)
      )
    }
  }, [subTitleRefs, setActiveSubtitle])

  const scrollToSubTitle = (index: number) => {
    if (!articleContainer) {
      return
    }

    articleContainer
      .querySelectorAll(`#${articleContainerId}>h2`)
      [index].scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <SidebarWrapper>
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
    </SidebarWrapper>
  )
}
