'use client'

import { LoginScreen } from '@cash-app/app'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@cash-app/app'

export default function LoginPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleLoginSuccess = () => {
    router.push('/dashboard')
  }

  // Don't render login screen if user is already authenticated
  if (user) {
    return null
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    </div>
  )
}
