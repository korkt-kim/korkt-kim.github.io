import '@/styles/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastCtx } from '@zakelstorm/ui'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import { env } from '@/env'
import { AppShell } from '@/features/layouts/AppShell'
import { domAnimation, LazyMotion } from '@/libs/framer'
import { BasicPageTemplate } from '@/templates/BasicPageTemplate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '코딩하는 폴제트',
  description: '프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.',
  openGraph: {
    title: '코딩하는 폴제트',
    description: '프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.',
    images: [`${env('NEXT_PUBLIC_BASE_URL')}/avatar.jpeg`],
  },
}

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>

      <body className={inter.className}>
        <LazyMotion features={domAnimation}>
          <AppShell>
            <BasicPageTemplate>
              <BasicPageTemplate.Content>{children}</BasicPageTemplate.Content>
            </BasicPageTemplate>
          </AppShell>
        </LazyMotion>
        <ToastCtx />
      </body>
      <GoogleAnalytics gaId={env('NEXT_PUBLIC_GA_ID')} />
    </html>
  )
}
