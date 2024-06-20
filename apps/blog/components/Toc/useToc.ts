import { useCallback, useEffect, useState } from 'react'

import { TocProps } from './Toc'
import { TocElement } from './type'

export interface UseToc<ContentSelector>
  extends Pick<TocProps<ContentSelector>, 'headingSelector'> {
  content: ContentSelector
}

export const useToc = <ContentSelector extends Element = Element>({
  content,
  headingSelector,
}: UseToc<ContentSelector>) => {
  const [activeTocRef, setActiveTocRef] = useState('')

  useEffect(() => {
    const setActiveStyle = () => {
      const tocRef = Array.from(content?.querySelectorAll('[data-toc]') ?? [])
        .reverse()
        .find(item => {
          return (item as HTMLElement).offsetTop <= window.scrollY
        })
        ?.getAttribute('data-toc')

      setActiveTocRef(typeof tocRef === 'string' ? tocRef : '')
    }

    if (!window) {
      return
    }

    window.addEventListener('scroll', setActiveStyle)
    return () => {
      if (!window) {
        return
      }

      window.removeEventListener('scroll', setActiveStyle)
    }
  }, [content])

  return useCallback(() => {
    const hierarchy: TocElement[] = [
      { tag: 'H0', tocRef: 'undefined', children: [] },
    ]

    for (const header of Array.from(
      content.querySelectorAll(headingSelector.join(', '))
    )) {
      const { tagName: tag, textContent: text } = header
      // TODO: Math.random 대신 uniqueId()로 변경
      const tocRef = header.getAttribute('data-toc') || `toc-${Math.random()}`
      header.setAttribute('data-toc', tocRef)

      const node = { tag, text, tocRef, active: tocRef === activeTocRef }
      let last = hierarchy.at(-1)
      if (last) {
        while (last.tag >= node.tag) {
          hierarchy.pop()
          last = hierarchy.at(-1)!
        }
        last.children = last.children || []
        last.children.push(node)
      }

      hierarchy.push(node)
    }

    return hierarchy[0].children!
  }, [activeTocRef])
}
