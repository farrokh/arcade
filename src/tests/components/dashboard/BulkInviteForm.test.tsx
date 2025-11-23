import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BulkInviteForm } from '@/components/dashboard/BulkInviteForm'

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
    error: jest.fn(),
    warning: jest.fn()
  }
}))

describe('BulkInviteForm', () => {
  const mockReferralCode = 'TEST_REF_CODE'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form with all fields', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)
    
    expect(screen.getByPlaceholderText(/alice@example.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/join my fleet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send invites/i })).toBeInTheDocument()
  })

  it('displays the referral code in the link', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)
    
    expect(screen.getByText(new RegExp(mockReferralCode))).toBeInTheDocument()
  })

  it('has required attribute on emails textarea', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)

    const emailsInput = screen.getByPlaceholderText(/alice@example.com/i)
    expect(emailsInput).toHaveAttribute('required')
    expect(emailsInput).toHaveAttribute('name', 'emails')
  })

  it('has optional message textarea', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)

    const messageInput = screen.getByPlaceholderText(/join my fleet/i)
    expect(messageInput).not.toHaveAttribute('required')
    expect(messageInput).toHaveAttribute('name', 'message')
  })

  it('displays copy link button', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)

    expect(screen.getByRole('button', { name: /copy link/i })).toBeInTheDocument()
  })

  it('shows pro tip about recursive bonuses', () => {
    render(<BulkInviteForm referralCode={mockReferralCode} />)

    expect(screen.getByText(/pro tip/i)).toBeInTheDocument()
    expect(screen.getByText(/recursive activation bonuses/i)).toBeInTheDocument()
    expect(screen.getByText(/10 levels deep/i)).toBeInTheDocument()
  })
})
