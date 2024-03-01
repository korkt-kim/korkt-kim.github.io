import { Typo } from '@zakelstorm/ui'
import { ComponentProps, PropsWithChildren } from 'react'

import { env } from '@/env'

export default function Page() {
  return (
    <>
      <Ul title='About Me'>
        <li>Frontend Developer </li>
        <li>Naver Z (2023~)</li>
        <li>Samsung Electronics - BigData Center (2022~2023)</li>
        <li>Samsung Electronics - Global Technology Center (2018~2022)</li>
        <li>Korea University - Computer Science (2012~2018)</li>
      </Ul>

      <Ul title='Skills'>
        <li>React, NextJS, VueJS 2</li>
        <li>Javascript, Typescript</li>
        <li>Emotion, Tailwind</li>
        <li>ReactQuery, Jotai, Zustand, Redux-Toolkit</li>
        <li>Github Action, Jenkins</li>
        <li>Github</li>
        <li>AWS</li>
      </Ul>

      <Ul title='Contact'>
        <li>
          <Typo.Link href='https://github.com/korkt-kim' target='_blank'>
            Github
          </Typo.Link>
        </li>
        <li>
          <Typo.Link href={`mailto:${env('NEXT_PUBLIC_CONTACT_EMAIL')}`}>
            Email
          </Typo.Link>
        </li>
      </Ul>
    </>
  )
}

const Ul = ({
  children,
  title,
  ...props
}: PropsWithChildren & ComponentProps<'ul'> & { title: string }) => {
  return (
    <div className='mb-20'>
      <Typo.Title>{title}</Typo.Title>
      <ul className='list-disc ml-20 pl-20' {...props}>
        {children}
      </ul>
    </div>
  )
}
