import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'
import { useNextSanityImage } from 'next-sanity-image'

import sanityConfig from '@/sanity.config'

export interface SanityImageProps {
  asset: SanityImageSource
}

export const SanityImage = ({ asset }: SanityImageProps) => {
  const imageProps = useNextSanityImage(sanityConfig, asset)

  if (!imageProps) {
    return null
  }

  return (
    <Image
      loading='lazy'
      alt={''}
      {...imageProps}
      style={{
        width: 'auto',
        height: 'auto',
      }}
    />
  )
}
