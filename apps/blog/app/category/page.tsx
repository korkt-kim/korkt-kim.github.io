import { List, Typo } from '@zakelstorm/ui'

import { CATEGORIES } from '@/consts'

export default async function Page() {
  return (
    <List>
      {CATEGORIES.map(category => (
        <List.Item key={category} className='p-0 justify-center'>
          <Typo.Link
            href={`/category/${category}`.toLowerCase()}
            className='text-neutral-700 underline underline-offset-4 text-lg'>
            {category}
          </Typo.Link>
        </List.Item>
      ))}
    </List>
  )
}
