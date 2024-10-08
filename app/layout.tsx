import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'
import crypto from 'crypto'

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

// Generate a nonce for each request
const generateNonce = () => {
  return crypto.randomBytes(16).toString('base64');
};

const nonce = generateNonce();  // Generate the nonce dynamically

// Content-Security-Policy with nonce applied
const csp = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' http://localhost:3000 picked-corgi-72.clerk.accounts.dev;
  connect-src 'self' picked-corgi-72.clerk.accounts.dev;
  img-src 'self' https://utfs.io https://img.clerk.com;
  style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  worker-src 'self' blob:;
`;  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      
      <html lang="en">

        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body className={poppins.variable}>{children}</body>
      </html>
    </ClerkProvider>
  )
}