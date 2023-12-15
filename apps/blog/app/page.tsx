import { Button } from '@zakelstorm/ui'

import { createArticle } from './action'
import { getAllArticles } from './lib/action'

export default async function Page() {
  const res = await getAllArticles()

  return (
    <form action={createArticle}>
      {JSON.stringify(res)}
      <Button type='submit'>asdfasfsadf</Button>
    </form>
  )
}
