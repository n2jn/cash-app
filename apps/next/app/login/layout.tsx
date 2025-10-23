import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Cash App',
  description: 'Sign in to your Cash App account',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
