'use client'

import { List } from '@zakelstorm/ui'
import Link from 'next/link'

import { CATEGORIES } from '@/consts'

export default function Page() {
  return (
    <List data={Array.from(CATEGORIES)}>
      {category => (
        <List.Item key={category} className='p-0 justify-center'>
          <Link
            href={`/category/${category}`}
            className='text-neutral-700 underline underline-offset-4 text-lg'>
            {category}
          </Link>
        </List.Item>
      )}
    </List>
  )
}
