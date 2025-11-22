import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { InviteSection } from '@/components/dashboard/InviteSection'

// Mock fetch
global.fetch = jest.fn()

describe('InviteSection', () => {
  const mockReferralCode = 'TEST_CODE_123'

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear()
  })

  it('renders the referral link correctly', () => {
    render(<InviteSection referralCode={mockReferralCode} />)
    
    // Check if the input with the link exists (it's in a div in our component, but we can check text content)
    expect(screen.getByText((content) => content.includes(mockReferralCode))).toBeInTheDocument()
  })

  it('allows entering an email and sending an invite', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: '123' } }),
    })

    render(<InviteSection referralCode={mockReferralCode} />)

    const emailInput = screen.getByPlaceholderText('friend@example.com')
    const sendButton = screen.getByText('Send')

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(sendButton)

    expect(screen.getByText('Sending...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Invite sent!')).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith('/api/invite', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({
        email: 'test@example.com',
        referralCode: mockReferralCode,
      }),
    }))
  })

  it('displays error message on failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: 'Failed to send' } }),
    })

    render(<InviteSection referralCode={mockReferralCode} />)

    const emailInput = screen.getByPlaceholderText('friend@example.com')
    const sendButton = screen.getByText('Send')

    fireEvent.change(emailInput, { target: { value: 'fail@example.com' } })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(screen.getByText('Failed to send')).toBeInTheDocument()
    })
  })
})
