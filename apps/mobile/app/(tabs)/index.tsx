import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { useAuth } from '@cash-app/app'
import { Center, VStack, Heading, Text, Button, ButtonText } from '@cash-app/ui'

/**
 * Home screen (placeholder)
 * Shows authenticated user info and logout option
 */
export default function Home() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/login')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Center flex={1} px="$4">
        <VStack space="lg" alignItems="center">
          <Heading size="2xl">Welcome to Cash App</Heading>

          {user && (
            <Text size="lg" color="$textLight600">
              Logged in as: {user.email}
            </Text>
          )}

          <Text size="md" textAlign="center" color="$textLight500">
            This is a placeholder home screen. Features will be added here.
          </Text>

          <Button
            action="secondary"
            variant="outline"
            onPress={handleLogout}
            mt="$8"
          >
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>
      </Center>
    </SafeAreaView>
  )
}
