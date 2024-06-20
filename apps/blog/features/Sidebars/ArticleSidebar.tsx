'use client'

import { Flex, Spinner, Typo } from '@zakelstorm/ui'
import { useEffect, useState } from 'react'

import { Toc } from '@/components/Toc/Toc'
import { articleContainerId } from '@/consts'

import { SidebarWrapper } from './SidebarWrapper'

export const ArticleSidebar = () => {
  const [articleContainer, setArticleContainer] = useState<Element | null>(null)

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    const articleContainer = document.querySelector(`#${articleContainerId}`)
    setArticleContainer(articleContainer)
  }, [])

  return (
    <SidebarWrapper>
      <Typo.Title level={1} className='mb-20 text-center text-base'>
        Table of Contents
      </Typo.Title>
      {articleContainer ? (
        <Toc
          headingSelector={['h2']}
          contentSelector={articleContainer}
          activeStyle={{ color: 'rgb(96, 165, 250)' }}
        />
      ) : (
        <Flex justify='center'>
          <Spinner />
        </Flex>
      )}
    </SidebarWrapper>
  )
}
