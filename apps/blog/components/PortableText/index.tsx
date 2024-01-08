'use client'

import {
  PortableText as _PortableText,
  PortableTextProps,
  PortableTextReactComponents,
} from '@portabletext/react'
import { CodeInputValue } from '@sanity/code-input'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { ReactNode } from 'react'
import { PortableTextBlock } from 'sanity'

import { SanityCode } from './SanityCode'
import { SanityImage } from './SanityImage'

const serializers = {
  list: {
    bullet: ({ children }: { children: ReactNode }) => (
      <ul className='my-10 pl-40'>{children}</ul>
    ),
    number: ({ children }: { children: ReactNode }) => (
      <ol className='my-10 pl-40'>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: ReactNode }) => (
      <li className='list-disc list-inside indent-[-20px]'>{children}</li>
    ),
    number: ({ children }: { children: ReactNode }) => (
      <li className='list-decimal list-inside indent-[-20px]'>{children}</li>
    ),
  },
  block: {
    normal: ({ children }: { children: ReactNode }) => {
      return <p className='leading-30'>{children}</p>
    },
    h2: ({ children }: { children: ReactNode }) => {
      return <h2 className='text-2xl my-20'>{children}</h2>
    },
    h4: ({ children }: { children: ReactNode }) => {
      return <h4 className='text-lg my-5'>{children}</h4>
    },
  },

  types: {
    code: ({ value }: { value: CodeInputValue }) => {
      return <SanityCode {...value} />
    },
    image: ({ value }: { value: { asset: SanityImageSource } }) => {
      return (
        <figure className='mx-auto px-60 mt-20 h-auto max-w-full'>
          <SanityImage {...value} />
        </figure>
      )
    },
  },
}

export const PortableText = <B extends PortableTextBlock>(
  props: PortableTextProps<B>
) => {
  return (
    <_PortableText
      {...props}
      components={serializers as Partial<PortableTextReactComponents>}
    />
  )
}
