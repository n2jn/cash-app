import type { Metadata } from 'next'
import { ProvidersWrapper } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cash App',
  description: 'Send and receive money with Cash App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}
