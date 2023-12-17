import './globals.css'
import '@zakelstorm/ui/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { PropsWithChildren } from 'react'

import { Footer } from './features/Footer'
import { Header } from './features/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '코딩하는 폴제트',
  description: '프론트엔드 개발자, 코딩하는 폴제트의 작은 공간입니다.',
}

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html lang='en'>
      <Script src='/env.js' type='text/javascript'></Script>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
