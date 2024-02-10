import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
// import { ClerkProvider } from '@clerk/nextjs'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Smooth Scroll',
  description: 'Smooth Scroll is a platform for event management.',
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <Header/>
        <body className={poppins.variable}>{children}</body>
        <Footer/>
      </html>

  )
}