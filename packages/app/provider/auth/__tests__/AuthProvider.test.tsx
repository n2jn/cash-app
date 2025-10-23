import { renderHook, act, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../AuthProvider'
import type { ReactNode } from 'react'

// Wrapper component for testing
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('AuthProvider', () => {
  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error
      console.error = jest.fn()

      expect(() => {
        renderHook(() => useAuth())
      }).toThrow('useAuth must be used within AuthProvider')

      console.error = originalError
    })

    it('should provide initial auth state', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(result.current.user).toBeNull()
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should provide login and logout methods', () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      expect(typeof result.current.login).toBe('function')
      expect(typeof result.current.logout).toBe('function')
      expect(typeof result.current.clearError).toBe('function')
    })
  })

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.user).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      })
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should set loading state during login', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      let loadingDuringLogin = false

      const loginPromise = act(async () => {
        const promise = result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })

        // Check loading state immediately after calling login
        await waitFor(() => {
          if (result.current.isLoading) {
            loadingDuringLogin = true
          }
        })

        return promise
      })

      await loginPromise
      expect(loadingDuringLogin).toBe(true)
      expect(result.current.isLoading).toBe(false)
    })

    it('should handle login failure with invalid credentials', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        try {
          await result.current.login({
            email: 'test@example.com',
            password: 'wrongpassword',
          })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.user).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('Invalid email or password')
    })

    it('should throw error on login failure', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      await expect(
        act(async () => {
          await result.current.login({
            email: 'test@example.com',
            password: 'wrongpassword',
          })
        })
      ).rejects.toMatchObject({
        message: 'Invalid email or password',
      })
    })
  })

  describe('logout', () => {
    it('should successfully logout authenticated user', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      // First login
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      expect(result.current.isAuthenticated).toBe(true)

      // Then logout
      await act(async () => {
        await result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.user).toBeNull()
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })

    it('should set loading state during logout', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      // First login
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      let loadingDuringLogout = false

      const logoutPromise = act(async () => {
        const promise = result.current.logout()

        // Check loading state immediately after calling logout
        await waitFor(() => {
          if (result.current.isLoading) {
            loadingDuringLogout = true
          }
        })

        return promise
      })

      await logoutPromise
      expect(loadingDuringLogout).toBe(true)
      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('clearError', () => {
    it('should clear error state', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      // Trigger an error
      await act(async () => {
        try {
          await result.current.login({
            email: 'test@example.com',
            password: 'wrongpassword',
          })
        } catch (error) {
          // Expected to throw
        }
      })

      expect(result.current.error).toBe('Invalid email or password')

      // Clear the error
      act(() => {
        result.current.clearError()
      })

      expect(result.current.error).toBeNull()
    })

    it('should not affect other state when clearing error', async () => {
      const { result } = renderHook(() => useAuth(), { wrapper })

      // Login successfully
      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      const userBeforeClear = result.current.user
      const isAuthenticatedBeforeClear = result.current.isAuthenticated

      // Clear error (even though there's no error)
      act(() => {
        result.current.clearError()
      })

      expect(result.current.user).toBe(userBeforeClear)
      expect(result.current.isAuthenticated).toBe(isAuthenticatedBeforeClear)
      expect(result.current.error).toBeNull()
    })
  })

  describe('state persistence', () => {
    it('should maintain user state between re-renders', async () => {
      const { result, rerender } = renderHook(() => useAuth(), { wrapper })

      await act(async () => {
        await result.current.login({
          email: 'test@example.com',
          password: 'password123',
        })
      })

      const userAfterLogin = result.current.user

      rerender()

      expect(result.current.user).toBe(userAfterLogin)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })
})
