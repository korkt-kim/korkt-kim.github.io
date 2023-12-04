'use server'

import { env } from '@/env'

export async function onClick() {
  const res = await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/api/article`, {
    body: JSON.stringify({
      title: 'a',
      password: 'rnrn0808!!',
      category: ['Typescript'],
    }),
    method: 'POST',
  })

  const data = await res.json()

  await fetch(`${env('NEXT_PUBLIC_BASE_URL')}/api/revalidate`, {
    body: JSON.stringify(data),
    method: 'POST',
  })

  return JSON.stringify(data)
}
