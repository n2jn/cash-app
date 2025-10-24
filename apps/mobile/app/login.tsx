import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LoginScreen } from '@cash-app/app'
import { Box } from '@cash-app/ui'

/**
 * Login screen route with mobile-specific optimizations
 * - KeyboardAvoidingView for iOS/Android keyboard handling
 * - SafeAreaView for iOS notch and home indicator
 * - Keyboard dismiss on tap outside
 * - Navigation handlers for signup and forgot password
 */
export default function Login() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    // Use replace to prevent back navigation to login
    router.replace('/(tabs)')
  }

  const handleSignUpPress = () => {
    // TODO: Navigate to signup screen when implemented
    console.log('Navigate to signup screen')
    // router.push('/signup')
  }

  const handleForgotPasswordPress = () => {
    // TODO: Navigate to forgot password screen when implemented
    console.log('Navigate to forgot password screen')
    // router.push('/forgot-password')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box flex={1}>
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onSignUpPress={handleSignUpPress}
              onForgotPasswordPress={handleForgotPasswordPress}
            />
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
