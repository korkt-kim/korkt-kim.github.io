'use client'

import { useEffect, useState } from 'react'

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
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
    if (currentSection > lastSection) return

    const nextPage = (currentSection + 1) * sectionSize - sectionSize + 1

    setActive(nextPage)
    onChange?.(nextPage)
  }

  const prev = () => {
    if (currentSection === 1) return

    const nextPage = (currentSection - 1) * sectionSize

    setActive(nextPage)
    onChange?.(nextPage)
  }

  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='text'
        className='flex items-center gap-2'
        onClick={prev}
        disabled={currentSection === 1}>
        <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
      </Button>
      <div className='flex items-center gap-2'>
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
              <IconButton {...getItemProps(page)} key={index}>
                {page}
              </IconButton>
            )
          })
          .filter(Boolean)}
      </div>
      <Button
        variant='text'
        className='flex items-center gap-2'
        onClick={next}
        disabled={currentSection == lastSection}>
        <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
      </Button>
    </div>
  )
}
