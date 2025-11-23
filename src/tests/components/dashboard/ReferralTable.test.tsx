import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ReferralTable } from '@/components/dashboard/ReferralTable'

describe('ReferralTable', () => {
  const mockReferrals = [
    {
      email: 'user1@example.com',
      created_at: '2023-01-15T10:00:00Z'
    },
    {
      email: 'user2@example.com',
      created_at: '2023-01-20T15:30:00Z'
    },
    {
      email: 'user3@example.com',
      created_at: '2023-01-25T08:45:00Z'
    }
  ]

  it('renders the table title', () => {
    render(<ReferralTable referrals={mockReferrals} />)
    
    expect(screen.getByText('Recent Referrals')).toBeInTheDocument()
  })

  it('displays all referral emails', () => {
    render(<ReferralTable referrals={mockReferrals} />)
    
    expect(screen.getByText('user1@example.com')).toBeInTheDocument()
    expect(screen.getByText('user2@example.com')).toBeInTheDocument()
    expect(screen.getByText('user3@example.com')).toBeInTheDocument()
  })

  it('shows initials for each referral', () => {
    render(<ReferralTable referrals={mockReferrals} />)
    
    // Each email should have initials displayed (first 2 chars uppercase)
    const initials = screen.getAllByText('US')
    expect(initials.length).toBeGreaterThan(0)
  })

  it('formats dates as relative time', () => {
    render(<ReferralTable referrals={mockReferrals} />)
    
    // Check that relative time formatting is present
    const dates = screen.getAllByText(/ago/i)
    expect(dates.length).toBe(3)
  })

  it('renders empty state when no referrals', () => {
    render(<ReferralTable referrals={[]} />)
    
    expect(screen.getByText(/no referrals yet/i)).toBeInTheDocument()
    expect(screen.getByText(/start inviting/i)).toBeInTheDocument()
  })

  it('renders all referrals without limiting', () => {
    const manyReferrals = Array.from({ length: 10 }, (_, i) => ({
      email: `user${i}@example.com`,
      created_at: new Date(2023, 0, i + 1).toISOString()
    }))

    render(<ReferralTable referrals={manyReferrals} />)
    
    // Should show all referrals
    const rows = screen.getAllByRole('row')
    // +1 for header row (even though it's sr-only)
    expect(rows.length).toBe(11)
  })
})
