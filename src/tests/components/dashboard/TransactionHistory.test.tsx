import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { TransactionHistory } from '@/components/dashboard/TransactionHistory'

// Mock ReferralChain to simplify testing
jest.mock('@/components/dashboard/ReferralChain', () => ({
  ReferralChain: () => (<div data-testid="referral-chain">Referral Chain</div>)
}))

// Mock MiniChart
jest.mock('@/components/MiniChart', () => ({
  MiniChart: ({ transactions }: { transactions: unknown[] }) => (
    <div data-testid="mini-chart">Mini Chart ({transactions.length} transactions)</div>
  )
}))

describe('TransactionHistory', () => {
  const mockCurrentUser = {
    email: 'user@example.com',
    full_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg'
  }

  it('renders empty state correctly', () => {
    render(<TransactionHistory transactions={[]} currentUser={mockCurrentUser} />)
    expect(screen.getByText(/No transactions yet/i)).toBeInTheDocument()
  })

  it('renders transactions correctly', () => {
    const transactions = [
      {
        amount: 100,
        source_type: 'signup',
        created_at: '2023-01-01T12:00:00Z',
        source_user: {
          email: 'user@example.com',
          full_name: 'Test User',
          avatar_url: null
        }
      }
    ]

    render(<TransactionHistory transactions={transactions} currentUser={mockCurrentUser} />)
    
    expect(screen.getByText('+100 mi')).toBeInTheDocument()
    expect(screen.getByText('signup')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
  })

  it('handles null source_user.email gracefully (Bug Fix Verification)', () => {
    // This test case reproduces the crash scenario where email might be null/undefined
    // even though the type says string, runtime data might be messy
    const transactions = [
      {
        amount: 50,
        source_type: 'referral',
        created_at: '2023-01-02T12:00:00Z',
        source_user: {
          email: null as unknown, // Force null to simulate the bug
          full_name: null,
          avatar_url: null
        }
      }
    ]

    render(<TransactionHistory transactions={transactions} currentUser={mockCurrentUser} />)
    
    // Should render '?' for the avatar placeholder
    expect(screen.getByText('?')).toBeInTheDocument()
    // Should render 'Unknown' for the name
    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })

  it('renders recursive referrals with ReferralChain', () => {
    const transactions = [
      {
        amount: 25,
        source_type: 'recursive_referral',
        created_at: '2023-01-03T12:00:00Z',
        source_user: null,
        referral_path: [
          { email: 'a@example.com', full_name: 'A', avatar_url: null }
        ]
      }
    ]

    render(<TransactionHistory transactions={transactions} currentUser={mockCurrentUser} />)
    
    expect(screen.getByTestId('referral-chain')).toBeInTheDocument()
  })
})
