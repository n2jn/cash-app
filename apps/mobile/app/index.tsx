import { useEffect } from 'react'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '@cash-app/app'
import { Center, Text } from '@cash-app/ui'
import { Platform } from 'react-native';

console.log(Platform.OS);

/**
 * Index route that handles initial app routing based on auth state
 * Redirects to login if not authenticated, or to home if authenticated
 */
export default function Index() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only navigate once we know the auth state
    if (!isLoading) {
      // if (isAuthenticated) {
      //   router.replace('/(tabs)')
      // } else {
      //   router.replace('/login')
      // }
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading screen while checking auth state
 if (isLoading) {
    return (
      <Center flex={1} backgroundColor="$white">
        <Text>Loading...</Text>
      </Center>
    )
 }

  // Fallback redirect (should not be reached due to useEffect)
  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/login" />
  )
}
