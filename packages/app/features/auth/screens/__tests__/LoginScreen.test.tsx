import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginScreen } from '../LoginScreen'
import { AuthProvider } from '../../../../provider/auth/AuthProvider'
import type { ReactNode } from 'react'

// Mock the UI components to simplify testing
jest.mock('@cash-app/ui', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  VStack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Heading: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  FormField: ({ children, label, error, ...props }: any) => (
    <div {...props}>
      <label>{label}</label>
      {children}
      {error && <span data-testid="field-error">{error}</span>}
    </div>
  ),
  Input: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  InputField: ({ value, onChangeText, onBlur, placeholder, type, ...props }: any) => (
    <input
      {...props}
      type={type === 'password' ? 'password' : 'text'}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText?.(e.target.value)}
      onBlur={onBlur}
      data-testid={placeholder?.toLowerCase().includes('email') ? 'email-input' : 'password-input'}
    />
  ),
  Button: ({ children, onPress, isDisabled, ...props }: any) => (
    <button {...props} onClick={onPress} disabled={isDisabled} data-testid="submit-button">
      {children}
    </button>
  ),
  ButtonText: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  ButtonSpinner: () => <span data-testid="loading-spinner">Loading...</span>,
}))

// Wrapper component for testing
const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
)

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render email and password fields', () => {
      render(<LoginScreen />, { wrapper })

      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
    })

    it('should render submit button', () => {
      render(<LoginScreen />, { wrapper })

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveTextContent('Login')
    })

    it('should render heading', () => {
      render(<LoginScreen />, { wrapper })

      expect(screen.getByText('Login')).toBeInTheDocument()
    })

    it('should render mock credentials hint', () => {
      render(<LoginScreen />, { wrapper })

      expect(screen.getByText(/Mock credentials/i)).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('should disable submit button initially when form is empty', () => {
      render(<LoginScreen />, { wrapper })

      const submitButton = screen.getByTestId('submit-button')
      expect(submitButton).toBeDisabled()
    })

    it('should show email validation error for invalid email after blur', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')

      // Type invalid email and blur
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
      fireEvent.blur(emailInput)

      // Wait for debounced validation
      await waitFor(() => {
        const errors = screen.getAllByTestId('field-error')
        expect(errors.some(el => el.textContent?.includes('valid email'))).toBe(true)
      })
    })

    it('should show password validation error for short password after blur', async () => {
      render(<LoginScreen />, { wrapper })

      const passwordInput = screen.getByTestId('password-input')

      // Type short password and blur
      fireEvent.change(passwordInput, { target: { value: 'short' } })
      fireEvent.blur(passwordInput)

      // Wait for debounced validation
      await waitFor(() => {
        const errors = screen.getAllByTestId('field-error')
        expect(
          errors.some(el => el.textContent?.includes('at least 8 characters'))
        ).toBe(true)
      })
    })

    it('should show password validation error for password without number after blur', async () => {
      render(<LoginScreen />, { wrapper })

      const passwordInput = screen.getByTestId('password-input')

      // Type password without number and blur
      fireEvent.change(passwordInput, { target: { value: 'abcdefgh' } })
      fireEvent.blur(passwordInput)

      // Wait for debounced validation
      await waitFor(() => {
        const errors = screen.getAllByTestId('field-error')
        expect(
          errors.some(el =>
            el.textContent?.includes('at least one letter and one number')
          )
        ).toBe(true)
      })
    })

    it('should enable submit button when form is valid', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Wait for debounced validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })
    })

    it('should not show validation errors before field is blurred', () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')

      // Type invalid email but don't blur
      fireEvent.change(emailInput, { target: { value: 'invalid' } })

      // Should not show error immediately
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('should perform debounced validation (300ms)', async () => {
      jest.useFakeTimers()

      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')

      // Type invalid email and blur
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.blur(emailInput)

      // Advance timers by less than 300ms
      jest.advanceTimersByTime(200)

      // Should not show error yet
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()

      // Advance timers to complete debounce
      jest.advanceTimersByTime(100)

      // Now should show error
      await waitFor(() => {
        expect(screen.getByTestId('field-error')).toBeInTheDocument()
      })

      jest.useRealTimers()
    })
  })

  describe('Form Submission', () => {
    it('should show loading spinner during login', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Should show loading spinner
      await waitFor(() => {
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
      })
    })

    it('should call onLoginSuccess after successful login', async () => {
      const onLoginSuccess = jest.fn()

      render(<LoginScreen onLoginSuccess={onLoginSuccess} />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with valid credentials
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Wait for login to complete
      await waitFor(() => {
        expect(onLoginSuccess).toHaveBeenCalledTimes(1)
      })
    })

    it('should display error message on login failure', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with invalid credentials (wrong password)
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword1' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
      })
    })

    it('should not call onLoginSuccess on login failure', async () => {
      const onLoginSuccess = jest.fn()

      render(<LoginScreen onLoginSuccess={onLoginSuccess} />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with invalid credentials
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword1' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
      })

      // onLoginSuccess should not have been called
      expect(onLoginSuccess).not.toHaveBeenCalled()
    })

    it('should validate form on submit even without blur', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with invalid email (no blur)
      fireEvent.change(emailInput, { target: { value: 'invalid' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Try to submit (button will be disabled)
      expect(submitButton).toBeDisabled()
    })
  })

  describe('Error Handling', () => {
    it('should clear authentication errors when user starts typing', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with invalid credentials
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword1' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form to trigger error
      fireEvent.click(submitButton)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
      })

      // Start typing to clear error
      fireEvent.change(emailInput, { target: { value: 'test@example.co' } })

      // Error should be cleared
      await waitFor(() => {
        expect(screen.queryByText(/Invalid email or password/i)).not.toBeInTheDocument()
      })
    })

    it('should keep form populated after login failure', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement
      const submitButton = screen.getByTestId('submit-button')

      const testEmail = 'test@example.com'
      const testPassword = 'wrongpassword1'

      // Fill form with invalid credentials
      fireEvent.change(emailInput, { target: { value: testEmail } })
      fireEvent.change(passwordInput, { target: { value: testPassword } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Wait for error to appear
      await waitFor(() => {
        expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument()
      })

      // Form should still be populated
      expect(emailInput.value).toBe(testEmail)
      expect(passwordInput.value).toBe(testPassword)
    })

    it('should disable inputs during loading', async () => {
      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input') as HTMLInputElement
      const passwordInput = screen.getByTestId('password-input') as HTMLInputElement
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with valid data
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Inputs should be disabled during loading
      await waitFor(() => {
        expect(emailInput).toBeDisabled()
        expect(passwordInput).toBeDisabled()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for form fields', () => {
      render(<LoginScreen />, { wrapper })

      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Password')).toBeInTheDocument()
    })

    it('should have placeholder text for inputs', () => {
      render(<LoginScreen />, { wrapper })

      expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    })

    it('should mark password field as secure', () => {
      render(<LoginScreen />, { wrapper })

      const passwordInput = screen.getByTestId('password-input')
      expect(passwordInput).toHaveAttribute('type', 'password')
    })
  })

  describe('Default Behavior', () => {
    it('should log success message when no onLoginSuccess callback provided', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()

      render(<LoginScreen />, { wrapper })

      const emailInput = screen.getByTestId('email-input')
      const passwordInput = screen.getByTestId('password-input')
      const submitButton = screen.getByTestId('submit-button')

      // Fill form with valid credentials
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      // Wait for validation
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      // Submit form
      fireEvent.click(submitButton)

      // Wait for login to complete
      await waitFor(() => {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          expect.stringContaining('Login successful!')
        )
      })

      consoleLogSpy.mockRestore()
    })
  })
})
