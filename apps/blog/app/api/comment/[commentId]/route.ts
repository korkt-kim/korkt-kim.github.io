import { last } from 'lodash-es'
import { NextRequest } from 'next/server'

import { env } from '@/env'
import { client } from '@/sanity/client'

export async function DELETE(req: NextRequest) {
  console.log('qwer')
  if (req.method !== 'DELETE') {
    return new Response(null, { status: 404, statusText: 'Not found' })
  }

  try {
    const id = last(req.url.split('/'))
    if (!id) {
      throw new Error()
    }
    const result = await client.delete(id, {
      token: env('NEXT_PUBLIC_SANITY_ADMIN_TOKEN'),
    })

    return new Response(JSON.stringify(result), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response(`Failed to create comment`, { status: 500 })
  }
}
