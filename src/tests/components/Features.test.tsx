import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Features } from '@/components/Features'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>
  }
}))

describe('Features', () => {
  it('renders all three feature cards', () => {
    render(<Features />)
    
    // Check for feature titles (they have numeric prefixes)
    expect(screen.getByText(/01\.\s*INITIALIZE/i)).toBeInTheDocument()
    expect(screen.getByText(/02\.\s*EXPAND/i)).toBeInTheDocument()
    expect(screen.getByText(/03\.\s*COMPOUND/i)).toBeInTheDocument()
  })

  it('renders correct credit values and descriptions', () => {
    render(<Features />)
    
    // Initialize feature
    expect(screen.getByText(/Receive 100 miles/i)).toBeInTheDocument()
    
    // Expand feature
    expect(screen.getByText(/Earn 50 miles/i)).toBeInTheDocument()
    
    // Compound feature
    expect(screen.getByText(/recursive rewards/i)).toBeInTheDocument()
  })

  it('displays all feature icons', () => {
    render(<Features />)
    
    // Should render 3 feature cards with content
    const featureCards = screen.getAllByText(/INITIALIZE|EXPAND|COMPOUND/)
    expect(featureCards).toHaveLength(3)
  })
})
