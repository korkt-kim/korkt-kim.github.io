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
      <ul className='my-[10px] pl-[40px]'>{children}</ul>
    ),
    number: ({ children }: { children: ReactNode }) => (
      <ol className='my-[10px] pl-[40px]'>{children}</ol>
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
      return <p className='leading-7'>{children}</p>
    },
    h2: ({ children }: { children: ReactNode }) => {
      return <h2 className='text-2xl my-[20px]'>{children}</h2>
    },
    h4: ({ children }: { children: ReactNode }) => {
      return <h4 className='text-lg my-[5px]'>{children}</h4>
    },
  },

  types: {
    code: ({ value }: { value: CodeInputValue }) => {
      return <SanityCode {...value} />
    },
    image: ({ value }: { value: { asset: SanityImageSource } }) => {
      return (
        <figure className='mx-auto px-[60px] mt-[20px] h-auto max-w-full'>
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
