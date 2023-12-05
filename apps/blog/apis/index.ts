import 'server-only'
import { QueryParams, SanityClient } from 'next-sanity'

const DEFAULT_PARAMS = {} as QueryParams
const DEFAULT_TAGS = [] as string[]

export async function sanityFetch<QueryResponse>(
  client: SanityClient,
  {
    query,
    params = DEFAULT_PARAMS,
    tags = DEFAULT_TAGS,
  }: {
    query: string
    params?: QueryParams
    tags: string[]
  }
): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}
