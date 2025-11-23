import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthForm } from '@/components/auth-form'

// Mock Supabase client
const mockSignInWithPassword = jest.fn()
const mockSignUp = jest.fn()
const mockSignInWithOAuth = jest.fn()

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signUp: mockSignUp,
      signInWithOAuth: mockSignInWithOAuth
    }
  }))
}))

// Mock next/navigation
const mockPush = jest.fn()
const mockRefresh = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh
  }),
  useSearchParams: () => ({
    get: jest.fn()
  })
}))

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Login Mode', () => {
    it('renders login form with email and password fields', () => {
      render(<AuthForm type="login" />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
    })

    it('submits login form with valid credentials', async () => {
      mockSignInWithPassword.mockResolvedValue({ 
        data: { user: { id: '123' } }, 
        error: null 
      })

      render(<AuthForm type="login" />)

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'test@example.com' }
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' }
      })
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

      await waitFor(() => {
        expect(mockSignInWithPassword).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123'
        })
        expect(mockPush).toHaveBeenCalledWith('/dashboard')
      })
    })

    it('displays error message on login failure', async () => {
      mockSignInWithPassword.mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' }
      })

      render(<AuthForm type="login" />)

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'wrong@example.com' }
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'wrongpass' }
      })
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

      await waitFor(() => {
        expect(screen.getByText(/an error occurred/i)).toBeInTheDocument()
      })
    })
  })

  describe('Signup Mode', () => {
    it('renders signup form with email and password fields', () => {
      render(<AuthForm type="signup" />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    })

    it('submits signup form successfully', async () => {
      mockSignUp.mockResolvedValue({ 
        data: { user: { id: '123' } }, 
        error: null 
      })

      render(<AuthForm type="signup" />)

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'newuser@example.com' }
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'securepass123' }
      })
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled()
      })
    })

    it('displays error message on signup failure', async () => {
      mockSignUp.mockResolvedValue({
        data: null,
        error: { message: 'Email already registered' }
      })

      render(<AuthForm type="signup" />)

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'existing@example.com' }
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'password123' }
      })
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

      await waitFor(() => {
        expect(screen.getByText(/an error occurred/i)).toBeInTheDocument()
      })
    })
  })

  describe('Google OAuth', () => {
    it('renders Google sign-in button', () => {
      render(<AuthForm type="login" />)

      expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
    })
  })
})
