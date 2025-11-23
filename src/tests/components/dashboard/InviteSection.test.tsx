import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InviteSection } from '@/components/dashboard/InviteSection'
import { inviteUser } from '@/lib/actions'
import { toast } from 'sonner'

// Mock the server action
jest.mock('@/lib/actions', () => ({
  inviteUser: jest.fn()
}))

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

describe('InviteSection', () => {
  const mockReferralCode = 'TEST_CODE_123'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the referral link with code', () => {
    render(<InviteSection referralCode={mockReferralCode} />)
    
    // Check that the referral code appears in the link
    expect(screen.getByText(new RegExp(mockReferralCode))).toBeInTheDocument()
  })

  it('allows entering an email and sending an invite successfully', async () => {
    (inviteUser as jest.Mock).mockResolvedValue({ success: true })

    render(<InviteSection referralCode={mockReferralCode} />)

    const emailInput = screen.getByPlaceholderText('friend@example.com')
    const sendButton = screen.getByText('Send')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(sendButton)

    expect(screen.getByText('Sending...')).toBeInTheDocument()

    await waitFor(() => {
      expect(inviteUser).toHaveBeenCalledWith(null, expect.any(FormData))
      expect(toast.success).toHaveBeenCalledWith('Invite sent!')
    })
  })

  it('displays error message via toast on failure', async () => {
    (inviteUser as jest.Mock).mockResolvedValue({ error: 'Failed to send' })

    render(<InviteSection referralCode={mockReferralCode} />)

    const emailInput = screen.getByPlaceholderText('friend@example.com')
    const sendButton = screen.getByText('Send')

    fireEvent.change(emailInput, { target: { value: 'fail@example.com' } })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to send')
    })
  })
})
