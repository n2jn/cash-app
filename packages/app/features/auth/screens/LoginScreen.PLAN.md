# LoginScreen Implementation Plan

## Status
**WAITING FOR UI COMPONENTS** - Blocked by FEATURE-001-13

The LoginScreen implementation is ready to be built once the UI components are available from `@cash-app/ui`.

## Required UI Components

The following components must be exported from `@cash-app/ui` before LoginScreen can be implemented:

- `Box` - Layout container (from Gluestack UI)
- `VStack` - Vertical stack layout (from Gluestack UI)
- `Heading` - Heading text (from Gluestack UI)
- `Text` - Body text (from Gluestack UI)
- `Card` - Card container (custom molecule)
- `FormField` - Form field with label and error (custom molecule)
- `Input` - Text input (from Gluestack UI)
- `InputField` - Input field component (from Gluestack UI)
- `Button` - Button component (from Gluestack UI)
- `ButtonText` - Button text (from Gluestack UI)
- `ButtonSpinner` - Button loading spinner (from Gluestack UI)

## Implementation Structure

```typescript
// LoginScreen.tsx
import {
  Box,
  VStack,
  Heading,
  Text,
  Card,
  FormField,
  Input,
  InputField,
  Button,
  ButtonText,
  ButtonSpinner,
} from '@cash-app/ui'
import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '../../../provider'
import { validateEmail, validatePassword } from '../utils/validation'
import type { ValidationResult } from '../types'

interface LoginScreenProps {
  onLoginSuccess?: () => void
}

export const LoginScreen: FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  // Component implementation here
}
```

## Features to Implement

### 1. Form State Management
- Email state
- Password state
- Email validation state
- Password validation state
- Form validation state

### 2. Real-time Validation
- Debounced validation (300ms)
- Email format validation
- Password requirements validation
- Show/hide error messages based on field interaction

### 3. Form Submission
- Disable submit button when form is invalid
- Show loading spinner during authentication
- Handle success: call onLoginSuccess callback
- Handle errors: display error message from AuthProvider

### 4. Error Display
- Field-level validation errors (below each input)
- Authentication errors (at top of form)
- Clear errors when user starts typing

### 5. Accessibility
- Proper label associations
- Error announcements
- Keyboard navigation
- Focus management

### 6. Responsive Layout
- Center card on screen
- Consistent padding on mobile and web
- Full-width inputs on mobile, fixed width on web
- Proper spacing between elements

## Component Props

```typescript
interface LoginScreenProps {
  /**
   * Callback function called after successful login
   * Platform experts will wire this to their navigation systems
   * Default: console.log success message
   */
  onLoginSuccess?: () => void
}
```

## Implementation Checklist

Once UI components are available:

- [ ] Import all required UI components from @cash-app/ui
- [ ] Implement form state management with useState
- [ ] Implement debounced validation with useCallback and useEffect
- [ ] Connect to AuthProvider using useAuth hook
- [ ] Implement email input field with validation
- [ ] Implement password input field with validation (secure text entry)
- [ ] Implement submit button with loading state
- [ ] Implement error display for authentication errors
- [ ] Implement responsive layout with Box, VStack, Card
- [ ] Add accessibility props (labels, error announcements)
- [ ] Handle keyboard submit (Enter key)
- [ ] Export LoginScreen from features/auth/index.ts
- [ ] Export LoginScreen from packages/app/index.ts
- [ ] Write integration tests

## Testing Strategy

### Integration Tests (LoginScreen.test.tsx)

```typescript
describe('LoginScreen', () => {
  // Render tests
  it('should render email and password fields')
  it('should render submit button')

  // Validation tests
  it('should show email validation error for invalid email')
  it('should show password validation error for short password')
  it('should disable submit when form is invalid')
  it('should enable submit when form is valid')

  // Submission tests
  it('should show loading spinner during login')
  it('should call onLoginSuccess after successful login')
  it('should display error message on login failure')

  // Interaction tests
  it('should clear errors when user starts typing')
  it('should submit form on Enter key press')
})
```

## Error Messages

- Invalid email: "Please enter a valid email address"
- Invalid password: "Password must be at least 8 characters and contain a number"
- Authentication failed: "Invalid email or password"
- Network error: "Unable to connect. Please check your internet connection"

## Layout Structure

```
<Box> (Screen container - centered)
  <Card> (Login form card)
    <VStack> (Vertical layout)
      <Heading>Login</Heading>
      {authError && <Text color="error">{authError}</Text>}

      <FormField label="Email" error={emailError}>
        <Input>
          <InputField
            type="email"
            value={email}
            onChangeText={handleEmailChange}
          />
        </Input>
      </FormField>

      <FormField label="Password" error={passwordError}>
        <Input>
          <InputField
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
        </Input>
      </FormField>

      <Button
        disabled={!isFormValid}
        onPress={handleSubmit}
      >
        {isLoading ? <ButtonSpinner /> : <ButtonText>Login</ButtonText>}
      </Button>
    </VStack>
  </Card>
</Box>
```

## Next Steps

1. **Wait for ui-expert** to complete FEATURE-001-13 (UI component exports)
2. **Verify components** are available in `@cash-app/ui` package
3. **Implement LoginScreen** following this plan
4. **Write integration tests** for login flow
5. **Update exports** in feature and package index files
6. **Update tasks.json** to mark FEATURE-002 tasks complete

## Notes for Platform Experts

### For expo-expert (Mobile Integration)
- Wire `onLoginSuccess` to Expo Router navigation
- Configure keyboard behavior (KeyboardAvoidingView)
- Set up SafeAreaView for iOS
- Configure status bar style

### For nextjs-expert (Web Integration)
- Wire `onLoginSuccess` to Next.js router navigation
- Configure SEO metadata for login page
- Handle SSR compatibility
- Set up auth middleware for protected routes

## Mock Credentials (for testing)

The AuthProvider currently uses mock authentication:
- **Email**: Any valid email format
- **Password**: `password123`

This will be replaced with actual API calls in the future.
