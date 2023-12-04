import 'server-only'

import { NextRequest } from 'next/server'

import { client } from '@/apis/client'
import { ArticleBody } from '@/apis/schemas/article'
import { env } from '@/env'

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new Response(null, { status: 404, statusText: 'Not found' })
  }

  try {
    const body: ArticleBody = await req.json()

    const result = await client.create(
      { _type: 'article', ...body },
      { token: env('NEXT_PUBLIC_SANITY_ADMIN_TOKEN') }
    )

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Failed to create article`, { status: 500 })
  }
}
