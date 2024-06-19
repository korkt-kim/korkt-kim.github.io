import { CSSProperties, useCallback, useMemo } from 'react'

import { TocElement } from './type'
import { useToc } from './useToc'

export interface TocProps<ContentSelector> {
  contentSelector: ContentSelector | string
  activeStyle?: CSSProperties
  headingSelector: ('h1' | 'h2' | 'h3' | 'h4' | 'h5')[]
}

export const Toc = <ContentSelector extends Element = Element>(
  props: TocProps<ContentSelector>
) => {
  const content = useMemo(() => {
    return typeof props.contentSelector === 'string'
      ? window.document.querySelector(props.contentSelector)!
      : props.contentSelector
  }, [props])

  const generateHierachy = useToc({
    content,
    headingSelector: props.headingSelector,
  })
  const renderToc = useCallback(
    (hierachy: TocElement[], indent = 0) => {
      const scrollToSubTitle = (tocRef: string) => {
        content
          ?.querySelector(`[data-toc="${tocRef}"]`)
          ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }

      return (
        <ol className='list-decimal text-15 pl-20 gap-100'>
          {hierachy.map(h => {
            return (
              <li key={h.tocRef} className='mb-8'>
                <button
                  role='link'
                  onClick={e => {
                    e.preventDefault()
                    scrollToSubTitle(h.tocRef)
                  }}
                  className='text-start'
                  style={{
                    textIndent: `${indent * 10}px`,
                    ...(h.active ? props.activeStyle : {}),
                  }}>
                  {h.text}
                </button>
                {renderToc(h.children ?? [], indent + 1)}
              </li>
            )
          })}
        </ol>
      )
    },
    [content, props.activeStyle]
  )

  if (!content) {
    return null
  }

  return <>{renderToc(generateHierachy())}</>
}
