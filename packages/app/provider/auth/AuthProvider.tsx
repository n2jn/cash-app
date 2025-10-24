import {
  createContext,
  useContext,
  useState,
  useCallback,
  type FC,
  type ReactNode,
} from 'react'
import type {
  AuthContextValue,
  AuthState,
  LoginCredentials,
  User,
  SocialProvider,
} from '../../features/auth/types'
import { mapAuthError } from '../../features/auth/utils/errors'

// Create context with default values
const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider - Manages authentication state across the application
 *
 * Provides:
 * - Current user information
 * - Authentication status
 * - Loading state
 * - Error state
 * - login() method
 * - logout() method
 * - clearError() method
 *
 * Usage:
 * Wrap your app with this provider at the root level.
 * Platform-specific apps (Expo/Next.js) should configure this in their root layout.
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  })

  /**
   * Login with email and password
   * @param credentials - Email and password
   * @throws Error if authentication fails
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      // Set loading state
      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }))

      // TODO: Replace with actual API call
      // This is a mock implementation for demonstration
      await mockLoginAPI(credentials)

      // Mock user data - replace with actual API response
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Test User',
      }

      // Set authenticated state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      // Map error to user-friendly message
      const authError = mapAuthError(error)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: authError.message,
      }))

      // Re-throw for component-level handling if needed
      throw authError
    }
  }, [])

  /**
   * Login with social provider (Google, Twitter, GitHub)
   * @param provider - Social authentication provider
   * @throws Error if authentication fails
   */
  const loginWithSocial = useCallback(async (provider: SocialProvider) => {
    try {
      // Set loading state
      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }))

      // TODO: Replace with actual OAuth flow
      // This is a mock implementation for demonstration
      await mockSocialLoginAPI(provider)

      // Mock user data - replace with actual OAuth response
      const user: User = {
        id: `${provider}-123`,
        email: `user@${provider}.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        avatar: `https://ui-avatars.com/api/?name=${provider}`,
      }

      // Set authenticated state
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      // Map error to user-friendly message
      const authError = mapAuthError(error)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: authError.message,
      }))

      // Re-throw for component-level handling if needed
      throw authError
    }
  }, [])

  /**
   * Logout the current user
   */
  const logout = useCallback(async () => {
    try {
      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
      }))

      // TODO: Replace with actual API call
      await mockLogoutAPI()

      // Clear auth state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      const authError = mapAuthError(error)

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: authError.message,
      }))

      throw authError
    }
  }, [])

  /**
   * Clear any authentication errors
   */
  const clearError = useCallback(() => {
    setAuthState((prev) => ({
      ...prev,
      error: null,
    }))
  }, [])

  const value: AuthContextValue = {
    ...authState,
    login,
    loginWithSocial,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access authentication context
 * @returns AuthContextValue
 * @throws Error if used outside AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

// Mock API functions - TODO: Replace with actual API calls
/**
 * Mock login API call
 * Simulates network delay and validates credentials
 */
const mockLoginAPI = async (
  credentials: LoginCredentials
): Promise<User> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock validation - accept any email with password "password123"
  if (credentials.password === 'password123') {
    return {
      id: '1',
      email: credentials.email,
      name: 'Test User',
    }
  }

  throw new Error('Invalid credentials')
}

/**
 * Mock logout API call
 * Simulates network delay
 */
const mockLogoutAPI = async (): Promise<void> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
}

/**
 * Mock social login API call
 * Simulates OAuth flow with network delay
 */
const mockSocialLoginAPI = async (
  provider: SocialProvider
): Promise<User> => {
  // Simulate network delay for OAuth flow
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock successful OAuth - in reality, this would handle OAuth tokens, redirects, etc.
  return {
    id: `${provider}-123`,
    email: `user@${provider}.com`,
    name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
    avatar: `https://ui-avatars.com/api/?name=${provider}`,
  }
}
