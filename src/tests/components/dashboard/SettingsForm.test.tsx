import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { SettingsForm } from '@/components/dashboard/SettingsForm'

// Mock resend to avoid API key requirement
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({}))
}))

// Mock useActionState
const mockFormAction = jest.fn()
const mockIsPending = false

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: () => [{}, mockFormAction, mockIsPending]
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('SettingsForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form with user data', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('ABC123')).toBeInTheDocument()
  })

  it('shows email as disabled field', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    const emailInput = screen.getByDisplayValue('test@example.com')
    expect(emailInput).toBeDisabled()
  })

  it('shows referral code as disabled field', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    const referralInput = screen.getByDisplayValue('ABC123')
    expect(referralInput).toBeDisabled()
  })

  it('allows editing full name', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    const nameInput = screen.getByDisplayValue('John Doe')
    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } })
    
    expect(nameInput).toHaveValue('Jane Smith')
  })

  it('displays save button', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
  })

  it('shows helper text for email', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    expect(screen.getByText(/email address cannot be changed/i)).toBeInTheDocument()
  })

  it('shows helper text for referral code', () => {
    render(<SettingsForm fullName="John Doe" email="test@example.com" referralCode="ABC123" />)
    
    expect(screen.getByText(/unique identifier in the network/i)).toBeInTheDocument()
  })
})
