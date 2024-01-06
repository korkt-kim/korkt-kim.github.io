'use client'

import { List, Typo } from '@zakelstorm/ui'

import { CATEGORIES } from '@/consts'

export default function Page() {
  return (
    <List data={Array.from(CATEGORIES)}>
      {category => (
        <List.Item key={category} className='p-0 justify-center'>
          <Typo.Link
            href={`/category/${category}`}
            className='text-neutral-700 underline underline-offset-4 text-lg'>
            {category}
          </Typo.Link>
        </List.Item>
      )}
    </List>
  )
}
