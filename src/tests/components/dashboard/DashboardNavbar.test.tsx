import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { DashboardNavbar } from '@/components/dashboard/DashboardNavbar'

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = 'Link'
  return MockLink
})

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

import { usePathname } from 'next/navigation'

describe('DashboardNavbar', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard')
  })

  it('renders all navigation links', () => {
    render(<DashboardNavbar />)
    
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Referrals')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('highlights active link based on current path', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard')
    
    render(<DashboardNavbar />)
    
    const overviewButton = screen.getByText('Overview')
    expect(overviewButton).toHaveClass('text-white')
  })

  it('shows inactive state for non-active links', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard')
    
    render(<DashboardNavbar />)
    
    const referralsButton = screen.getByText('Referrals')
    expect(referralsButton).toHaveClass('text-zinc-400')
  })

  it('renders correct href for each link', () => {
    render(<DashboardNavbar />)
    
    expect(screen.getByText('Overview').closest('a')).toHaveAttribute('href', '/dashboard')
    expect(screen.getByText('Referrals').closest('a')).toHaveAttribute('href', '/dashboard/referrals')
    expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/dashboard/settings')
  })
})
