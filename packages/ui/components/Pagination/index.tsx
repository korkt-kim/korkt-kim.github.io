'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '../Button'
import { IconButton } from '../IconButton'

export interface PaginationProps {
  current: number
  total: number
  pageSize?: number
  sectionSize?: number
  onChange?: (page: number) => void
}

export function Pagination({
  current,
  total,
  pageSize = 10,
  sectionSize = 5,
  onChange,
}: PaginationProps) {
  const [active, setActive] = useState(current)
  const totalPage = Math.ceil(total / pageSize)
  const currentSection = Math.ceil(active / sectionSize)
  const lastSection = Math.ceil(totalPage / sectionSize)

  const arrowDisabled = useMemo(() => {
    return {
      left: currentSection === 1,
      right: currentSection === lastSection,
    }
  }, [currentSection, lastSection])

  useEffect(() => {
    setActive(current)
  }, [current])

  const getItemProps = (index: number) =>
    ({
      variant: active === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => {
        setActive(index)
        onChange?.(index)
      },
    }) as any

  const next = () => {
    if (currentSection > lastSection) {
      return
    }

    const nextPage = (currentSection + 1) * sectionSize - sectionSize + 1

    setActive(nextPage)
    onChange?.(nextPage)
  }

  const prev = () => {
    if (currentSection === 1) {
      return
    }

    const nextPage = (currentSection - 1) * sectionSize

    setActive(nextPage)
    onChange?.(nextPage)
  }

  return (
    <div className='flex items-center gap-[16px]'>
      <Button
        variant='text'
        className='flex items-center gap-[8px]'
        onClick={prev}
        aria-label='이전 section으로 이동하기'
        aria-disabled={arrowDisabled.left}
        disabled={arrowDisabled.left}>
        <ArrowLeftIcon strokeWidth={2} className='h-[16px] w-[16px]' />
      </Button>
      <ul className='flex items-center gap-[8px]'>
        {Array(sectionSize)
          .fill(null)
          .map((_, index) => {
            const start =
              Math.floor((active - 1) / sectionSize) * sectionSize + 1

            const page = start + index
            if (page > totalPage) {
              return null
            }

            return (
              <li aria-current={active === page} key={index}>
                <IconButton role='link' {...getItemProps(page)}>
                  {page}
                </IconButton>
              </li>
            )
          })
          .filter(Boolean)}
      </ul>
      <Button
        variant='text'
        className='flex items-center gap-[8px]'
        onClick={next}
        aria-label='다음 section으로 이동하기'
        aria-disabled={arrowDisabled.right}
        disabled={arrowDisabled.right}>
        <ArrowRightIcon strokeWidth={2} className='h-[16px] w-[16px]' />
      </Button>
    </div>
  )
}
