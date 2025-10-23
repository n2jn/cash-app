import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { UIProvider } from '@cash-app/ui'
import { AppProvider } from '@cash-app/app'
import { useEffect } from 'react'

/**
 * Root layout for the mobile app
 * Configures providers and navigation structure
 */
export default function RootLayout() {
  // Verify new architecture is enabled
  useEffect(() => {
    console.log('=== React Native New Architecture Status ===')
    console.log('Bridgeless Mode:', (global as any).RN$Bridgeless === true)
    console.log('TurboModules Enabled:', (global as any).__turboModuleProxy != null)
    console.log('Fabric Enabled:', (global as any).nativeFabricUIManager != null)
  }, [])

  return (
    <UIProvider>
      <AppProvider>
        <StatusBar style="dark" />
        <Stack
          initialRouteName='index'
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProvider>
    </UIProvider>
  )
}
