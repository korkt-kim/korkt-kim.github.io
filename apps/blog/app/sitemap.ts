import { MetadataRoute } from 'next'

import { getAllArticles } from '@/action/article'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await getAllArticles()

  return [
    {
      url: 'https://zakelstorm.store',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://zakelstorm.store/category',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://zakelstorm.store/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...res.items.map(
      item =>
        ({
          url: `https://zakelstorm.store/${item._id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.5,
        }) as const
    ),
  ]
}
