import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from "next/image"
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
      alt={''}
      {...imageProps}
      sizes='(max-width: 800px) 100vw, 800px'
      style={{
        width: "100%",
        height: "auto"
      }} />
  );
}
