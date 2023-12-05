'use server'

import { revalidateTag } from 'next/cache'

import { env } from '@/env'

export async function createArticle() {
  const res = await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/api/article`, {
    body: JSON.stringify({
      title: 'k',
      password: 'rnrn0808!!',
      category: ['Typescript'],
    }),
    method: 'POST',
    cache: 'no-store',
  })

  const data = await res.json()
  revalidateTag('article')

  return JSON.stringify(data)
}
