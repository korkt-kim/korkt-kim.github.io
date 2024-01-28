import '@/styles/globals.css'
import '@zakelstorm/ui/globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ToastCtx } from '@zakelstorm/ui'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

import { AppShell } from '@/features/layouts/AppShell'
import { BasicPageTemplate } from '@/templates/BasicPageTemplate'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '코딩하는 폴제트',
  description: '프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.',
  openGraph: {
    title: '코딩하는 폴제트',
    description: '프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.',
    images: ['/avatar.jpeg'],
  },
}

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppShell>
          <BasicPageTemplate>
            <BasicPageTemplate.Content>{children}</BasicPageTemplate.Content>
          </BasicPageTemplate>
        </AppShell>
        <ToastCtx />
      </body>
    </html>
  )
}
