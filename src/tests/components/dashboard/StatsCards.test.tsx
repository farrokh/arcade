import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { StatsCards } from '@/components/dashboard/StatsCards'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: { children: React.ReactNode; className?: string }) => <div className={className}>{children}</div>
  }
}))

describe('StatsCards', () => {
  it('renders all stat cards with correct values', () => {
    render(<StatsCards mileage={250} referralCount={15} />)
    
    expect(screen.getByText(/250/)).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('displays Total Mileage label', () => {
    render(<StatsCards mileage={100} referralCount={5} />)
    
    expect(screen.getByText(/total mileage/i)).toBeInTheDocument()
  })

  it('displays Friends Invited label', () => {
    render(<StatsCards mileage={100} referralCount={5} />)
    
    expect(screen.getByText(/friends invited/i)).toBeInTheDocument()
  })

  it('handles zero values correctly', () => {
    render(<StatsCards mileage={0} referralCount={0} />)
    
    const zeroValues = screen.getAllByText('0')
    expect(zeroValues.length).toBeGreaterThan(0)
  })

  it('formats large numbers correctly', () => {
    render(<StatsCards mileage={1500} referralCount={250} />)
    
    expect(screen.getByText(/1,500/)).toBeInTheDocument()
    expect(screen.getByText('250')).toBeInTheDocument()
  })

  it('displays Active Pilot status', () => {
    render(<StatsCards mileage={100} referralCount={5} />)
    
    expect(screen.getByText(/active pilot/i)).toBeInTheDocument()
  })
})
