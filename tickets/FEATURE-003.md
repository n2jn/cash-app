# FEATURE-003: Mobile Login Integration

**Type:** Feature
**Platform:** Mobile
**Status:** ✅ COMPLETE
**Created:** 2025-10-19
**Completed:** 2025-10-19
**Assignee:** expo-expert

**Dependencies:**
- ✅ FEATURE-001-13: UI components exported (COMPLETE)
- ✅ FEATURE-002-04: LoginScreen created (COMPLETE)

## Description

Integrate the LoginScreen component from `packages/app/` into the Expo mobile app. This includes setting up navigation, wrapping the app with required providers, and configuring the mobile-specific login flow.

The integration should handle navigation from the login screen to the home screen after successful authentication, and ensure the AuthProvider is properly configured for the mobile environment.

## Acceptance Criteria

- [x] LoginScreen is integrated into mobile app navigation
- [x] AuthProvider is configured and wrapped around the app
- [x] GluestackUIProvider is configured for mobile
- [x] Navigation flows correctly from login to home screen
- [x] Back button behavior is handled appropriately (using router.replace)
- [x] Keyboard dismisses when tapping outside inputs (mobile UX)
- [x] Safe area insets are respected on iOS
- [x] Status bar styling is configured
- [x] Deep linking to login screen is supported (scheme: cashapp://)
- [x] Login state persists across app restarts (AsyncStorage configured)
- [x] App works on both iOS and Android
- [x] No console errors or warnings in mobile app

## Tasks

### Provider Setup
- [x] **Configure GluestackUIProvider** (apps/mobile/App.tsx or app/_layout.tsx)
  - Import GluestackUIProvider from @cash-app/ui
  - Import theme config from packages/ui/config
  - Wrap app with GluestackUIProvider

- [x] **Configure AuthProvider** (apps/mobile/App.tsx or app/_layout.tsx)
  - Import AuthProvider from @cash-app/app
  - Wrap app with AuthProvider (inside GluestackUIProvider)
  - Configure persistence using AsyncStorage

### Navigation Setup
- [x] **Configure navigation stack** (apps/mobile/app/)
  - Add login screen to navigation stack
  - Add home/dashboard screen (placeholder if not exists)
  - Configure initial route based on auth state
  - Set up protected routes (require authentication)

### Login Screen Integration
- [x] **Create login screen route** (apps/mobile/app/login.tsx or screens/LoginScreen.tsx)
  - Import LoginScreen from @cash-app/app
  - Wire up navigation callback (useRouter or useNavigation)
  - Handle successful login navigation to home
  - Handle keyboard dismiss on tap outside

- [x] **Configure navigation flow**
  - On successful login: navigate to home and clear login from stack
  - Prevent back navigation to login after successful authentication
  - Show splash screen while checking auth state on app start

### Mobile-Specific Configuration
- [x] **Configure keyboard behavior**
  - Wrap LoginScreen in KeyboardAvoidingView
  - Configure keyboard dismiss mode
  - Adjust content when keyboard is visible

- [x] **Configure safe areas** (iOS)
  - Use SafeAreaView for login screen
  - Respect notch and home indicator areas

- [x] **Configure status bar**
  - Set status bar style (dark/light)
  - Set status bar background color
  - Configure status bar visibility

### State Persistence
- [x] **Configure auth persistence**
  - Install @react-native-community/async-storage
  - Store auth token in AsyncStorage on login
  - Restore auth state on app launch
  - Clear auth state on logout

### Testing
- [x] **Test on iOS simulator**
  - Login flow works correctly
  - Navigation transitions are smooth
  - Keyboard behavior is correct
  - Safe areas are respected

- [x] **Test on Android emulator**
  - Login flow works correctly
  - Navigation transitions are smooth
  - Keyboard behavior is correct
  - Back button behavior is correct

### Documentation
- [x] Update apps/mobile/README.md with login screen setup
- [x] Document navigation structure
- [x] Document provider configuration

## Technical Notes

**Navigation Setup (Expo Router):**
```typescript
// apps/mobile/app/_layout.tsx
import { GluestackUIProvider } from '@cash-app/ui'
import { AuthProvider } from '@cash-app/app'

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </GluestackUIProvider>
  )
}
```

**Login Screen Route:**
```typescript
// apps/mobile/app/login.tsx
import { LoginScreen } from '@cash-app/app'
import { useRouter } from 'expo-router'
import { KeyboardAvoidingView, Platform } from 'react-native'

export default function Login() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.replace('/(tabs)')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <LoginScreen onLoginSuccess={handleLoginSuccess} />
    </KeyboardAvoidingView>
  )
}
```

**Auth State Routing:**
```typescript
// apps/mobile/app/index.tsx
import { useAuth } from '@cash-app/app'
import { Redirect } from 'expo-router'

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <SplashScreen />
  }

  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />
  }

  return <Redirect href="/login" />
}
```

**Required Packages:**
```json
{
  "dependencies": {
    "@react-native-community/async-storage": "^1.21.0",
    "expo-router": "^3.x",
    "@cash-app/ui": "workspace:*",
    "@cash-app/app": "workspace:*"
  }
}
```

**Keyboard Configuration:**
- Use KeyboardAvoidingView for iOS
- Use android:windowSoftInputMode="adjustResize" in AndroidManifest.xml
- Dismiss keyboard on tap outside using Keyboard.dismiss()

**Deep Linking:**
- Configure deep link scheme in app.json
- Add login screen to linking configuration
- Test deep links to login screen

**Security:**
- Store auth token securely in AsyncStorage
- Use SecureStore for sensitive data on production
- Clear sensitive data on logout

**Platform-Specific:**
- iOS: Configure status bar style, safe area insets
- Android: Configure back button behavior, keyboard mode
- Test on multiple screen sizes and orientations

## Related Tickets

- Blocked by: FEATURE-001 (Login Page UI Components)
- Blocked by: FEATURE-002 (Login Screen Implementation)
- Related to: FEATURE-004 (Web Login Integration)
