import { MetadataRoute } from 'next'

import { getAllArticles } from '@/action/article'
import { env } from '@/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getAllArticles()

  return [
    {
      url: env('NEXT_PUBLIC_BASE_URL'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${env('NEXT_PUBLIC_BASE_URL')}/category`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${env('NEXT_PUBLIC_BASE_URL')}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...res.items.map(
      item =>
        ({
          url: `${env('NEXT_PUBLIC_BASE_URL')}/${item._id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        }) as const
    ),
  ]
}
