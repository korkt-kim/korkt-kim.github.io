import { env } from '@/env'
import { SanityClient, createClient } from 'next-sanity'

const projectId = env('NEXT_PUBLIC_SANITY_PROJECT_ID')
const dataset = env('NEXT_PUBLIC_SANITY_DATASET')
const apiVersion = env('NEXT_PUBLIC_SANITY_API_VERSION')
const revalidateSecret = env('NEXT_PUBLIC_SANITY_REVALIDATE_SECRET')

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: revalidateSecret ? false : true,
})
