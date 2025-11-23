import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ReferralChain } from '@/components/dashboard/ReferralChain'

// Mock UserAvatar
jest.mock('@/components/UserAvatar', () => ({
  UserAvatar: ({ label }: { label: string }) => (
    <div data-testid="user-avatar">
      <span>{label}</span>
    </div>
  )
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
  }
}))

describe('ReferralChain', () => {
  const mockCurrentUser = { email: 'current@example.com', full_name: 'Current User' }
  const mockPath = [
    { email: 'user1@example.com', full_name: 'User One' },
    { email: 'user2@example.com', full_name: 'User Two' }
  ]

  it('renders the referral chain with current user and path', () => {
    render(<ReferralChain path={mockPath} currentUser={mockCurrentUser} />)
    
    expect(screen.getByText('You')).toBeInTheDocument()
  })

  it('shows expand button when path has more than 1 user', () => {
    const longPath = [
      { email: 'user1@example.com', full_name: 'User 1' },
      { email: 'user2@example.com', full_name: 'User 2' },
      { email: 'user3@example.com', full_name: 'User 3' }
    ]
    
    render(<ReferralChain path={longPath} currentUser={mockCurrentUser} />)
    
    // Should show expand indicator
    const expandButton = screen.getByRole('button')
    expect(expandButton).toBeInTheDocument()
  })

  it('expands to show all users when clicked', () => {
    const longPath = [
      { email: 'user1@example.com', full_name: 'User 1' },
      { email: 'user2@example.com', full_name: 'User 2' }
    ]
    
    render(<ReferralChain path={longPath} currentUser={mockCurrentUser} />)
    
    const expandButton = screen.getByRole('button')
    fireEvent.click(expandButton)
    
    // After expanding, should show more avatars
    const avatars = screen.getAllByTestId('user-avatar')
    expect(avatars.length).toBeGreaterThan(2)
  })

  it('supports keyboard navigation', () => {
    const longPath = [
      { email: 'user1@example.com', full_name: 'User 1' },
      { email: 'user2@example.com', full_name: 'User 2' }
    ]
    
    render(<ReferralChain path={longPath} currentUser={mockCurrentUser} />)
    
    const expandButton = screen.getByRole('button')
    fireEvent.keyDown(expandButton, { key: 'Enter' })
    
    const avatars = screen.getAllByTestId('user-avatar')
    expect(avatars.length).toBeGreaterThan(2)
  })

  it('renders without expand button for short paths', () => {
    const shortPath = [{ email: 'user1@example.com', full_name: 'User 1' }]
    
    render(<ReferralChain path={shortPath} currentUser={mockCurrentUser} />)
    
    // Should not have expand button for paths <= 2 total users
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
