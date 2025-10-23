import type { FC, ReactNode } from 'react'
import { AuthProvider } from './auth/AuthProvider'

interface AppProviderProps {
  children: ReactNode
}

/**
 * AppProvider - Root provider that combines all app-level providers
 *
 * This provider should be wrapped at the root of your application.
 * Platform-specific apps (Expo/Next.js) should use this in their root layout.
 *
 * Currently includes:
 * - AuthProvider for authentication state management
 *
 * Future providers can be added here (ThemeProvider, etc.)
 */
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}

// Re-export providers and hooks
export { AuthProvider, useAuth } from './auth/AuthProvider'
