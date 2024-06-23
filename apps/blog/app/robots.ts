import { MetadataRoute } from 'next'

import { env } from '@/env'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${env('NEXT_PUBLIC_BASE_URL')}/sitemap.xml`,
  }
}
