# Authentication Feature

This feature provides authentication functionality for the Cash App, including login, logout, and user state management.

## Status

**PARTIALLY COMPLETE** - Core authentication logic is implemented. Waiting for UI components from `@cash-app/ui` to complete LoginScreen.

### Completed
- AuthProvider with login/logout state management
- Email and password validation utilities
- Error handling utilities
- TypeScript types for authentication
- Unit tests for validation and error handling
- Unit tests for AuthProvider

### Pending
- LoginScreen component (blocked by FEATURE-001-13)
- Integration tests for LoginScreen (blocked by FEATURE-001-13)

## Structure

```
features/auth/
├── screens/
│   ├── LoginScreen.tsx (TODO: waiting for UI components)
│   ├── LoginScreen.PLAN.md (implementation plan)
│   └── __tests__/
│       └── LoginScreen.test.tsx (TODO)
├── utils/
│   ├── validation.ts (DONE)
│   ├── errors.ts (DONE)
│   └── __tests__/
│       ├── validation.test.ts (DONE)
│       └── errors.test.ts (DONE)
├── types.ts (DONE)
└── index.ts (DONE)
```

## Usage

### AuthProvider

Wrap your app with AuthProvider at the root level:

```typescript
import { AppProvider } from '@cash-app/app'

// In your root layout (Expo or Next.js)
export default function RootLayout({ children }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}
```

### useAuth Hook

Access authentication state and methods:

```typescript
import { useAuth } from '@cash-app/app'

function MyComponent() {
  const { user, isAuthenticated, isLoading, error, login, logout } = useAuth()

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      })
      // Login successful
    } catch (error) {
      // Login failed - error is already in auth state
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.email}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

### Validation Utilities

Validate email and password inputs:

```typescript
import { validateEmail, validatePassword, validateLoginForm } from '@cash-app/app'

// Validate email
const emailResult = validateEmail('user@example.com')
if (!emailResult.isValid) {
  console.error(emailResult.message)
}

// Validate password
const passwordResult = validatePassword('mypassword123')
if (!passwordResult.isValid) {
  console.error(passwordResult.message)
}

// Validate entire form
const formResult = validateLoginForm('user@example.com', 'mypassword123')
if (formResult.isFormValid) {
  // Submit form
}
```

### Error Handling

Map authentication errors to user-friendly messages:

```typescript
import { mapAuthError } from '@cash-app/app'

try {
  await someAuthOperation()
} catch (error) {
  const authError = mapAuthError(error)
  console.log(authError.message) // User-friendly message
  console.log(authError.code) // AuthErrorCode enum
}
```

## API

### Types

```typescript
interface User {
  id: string
  email: string
  name?: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

interface ValidationResult {
  isValid: boolean
  message?: string
}

interface FormValidationResult {
  email: ValidationResult
  password: ValidationResult
  isFormValid: boolean
}

enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  NETWORK_ERROR = 'NETWORK_ERROR',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}
```

### Validation Functions

```typescript
validateEmail(email: string): ValidationResult
validatePassword(password: string): ValidationResult
validateLoginForm(email: string, password: string): FormValidationResult
```

### Error Functions

```typescript
mapAuthError(error: Error | unknown): AuthError
getErrorMessage(code: AuthErrorCode): string
```

## Validation Rules

### Email
- Must not be empty
- Must match standard email format (user@domain.tld)

### Password
- Must not be empty
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number

## Error Messages

| Error Type | Message |
|------------|---------|
| Invalid email | "Please enter a valid email address" |
| Invalid password | "Password must be at least 8 characters and contain a number" |
| Invalid credentials | "Invalid email or password" |
| Network error | "Unable to connect. Please check your internet connection" |
| Rate limit | "Too many attempts. Please try again later" |
| Unknown error | "Something went wrong. Please try again" |

## Testing

Run tests:

```bash
# From workspace root
npm test --workspace=@cash-app/app
```

## Mock Authentication

The AuthProvider currently uses mock authentication for development:

- **Email**: Any valid email format
- **Password**: `password123` (hardcoded for testing)

This will be replaced with actual API integration in the future.

## Next Steps

1. Wait for UI components from `@cash-app/ui` (FEATURE-001-13)
2. Implement LoginScreen component
3. Write integration tests for LoginScreen
4. Platform experts integrate into Expo and Next.js apps
5. Replace mock authentication with actual API calls

## Related Tickets

- FEATURE-001: Login Page UI Components (blocking)
- FEATURE-002: Login Screen Implementation (current)
- FEATURE-003: Mobile Login Integration (next)
- FEATURE-004: Web Login Integration (next)
