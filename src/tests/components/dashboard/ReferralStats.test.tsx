import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ReferralStats } from '@/components/dashboard/ReferralStats'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
  }
}))

describe('ReferralStats', () => {
  const mockReferrals = [
    { id: '1', full_name: 'Active User 1' },
    { id: '2', full_name: 'Active User 2' },
    { id: '3', full_name: null }, // Pending user
  ]

  it('renders correct stats calculations', () => {
    render(<ReferralStats referrals={mockReferrals} totalEarned={500} />)

    // Total Referred: 3
    expect(screen.getByText('Total Referred')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()

    // Active Nodes: 2 (users with full_name)
    expect(screen.getByText('Active Nodes')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()

    // Pending: 1 (users without full_name)
    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()

    // Lifetime Earnings: 500 mi
    expect(screen.getByText('Lifetime Earnings')).toBeInTheDocument()
    expect(screen.getByText('500 mi')).toBeInTheDocument()
  })

  it('renders empty state correctly', () => {
    render(<ReferralStats referrals={[]} totalEarned={0} />)

    expect(screen.getAllByText('0')).toHaveLength(3) // Total, Active, Pending
    expect(screen.getByText('0 mi')).toBeInTheDocument()
  })
})
