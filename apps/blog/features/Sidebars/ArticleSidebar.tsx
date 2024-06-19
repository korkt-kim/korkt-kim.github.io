'use client'

import { Flex, Spinner, Typo } from '@zakelstorm/ui'
import { useCallback, useEffect, useRef, useState } from 'react'

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
        // <ol className='list-decimal text-12 pl-20'>
        //   {Array.from(
        //     articleContainer.querySelectorAll(`#${articleContainerId}>h2`)
        //   )
        //     .map(item => item.innerHTML)
        //     .map((subTitle, index) => {
        //       return (
        //         <li
        //           key={index}
        //           aria-current={active === index}
        //           style={{ marginBlockStart: 5 }}
        //           className={`hover:underline hover:cursor-pointer ${
        //             active === index ? `text-blue-400` : `!text-gray-300`
        //           }`}>
        //           <Typo.Link
        //             className='text-inherit'
        //             href='#'
        //             onClick={e => {
        //               e.preventDefault()

        //               scrollToSubTitle(index)
        //             }}>
        //             {unescape(subTitle)}
        //           </Typo.Link>
        //         </li>
        //       )
        //     })}
        // </ol>
        <Flex justify='center'>
          <Spinner />
        </Flex>
      )}
    </SidebarWrapper>
  )
}
