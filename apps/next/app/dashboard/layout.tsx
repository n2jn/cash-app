import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Cash App',
  description: 'Manage your Cash App account',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
