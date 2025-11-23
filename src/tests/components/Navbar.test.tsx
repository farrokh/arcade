import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Navbar } from '@/components/Navbar'

// Mock Supabase client
const mockSignOut = jest.fn()
const mockGetUser = jest.fn()
const mockOnAuthStateChange = jest.fn(() => ({
  data: { subscription: { unsubscribe: jest.fn() } }
}))

jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
      onAuthStateChange: mockOnAuthStateChange
    }
  })
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}))

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders login/signup links when not authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } })

    render(<Navbar />)

    await waitFor(() => {
      expect(screen.getByText('Log in')).toBeInTheDocument()
      expect(screen.getByText('Get Started')).toBeInTheDocument()
    })
    
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders dashboard/signout links when authenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: '123' } } })

    render(<Navbar />)

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    expect(screen.queryByText('Log in')).not.toBeInTheDocument()
  })

  it('calls signOut when Sign Out button is clicked', async () => {
    mockGetUser.mockResolvedValue({ data: { user: { id: '123' } } })

    render(<Navbar />)

    await waitFor(() => {
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Sign Out'))

    expect(mockSignOut).toHaveBeenCalled()
  })
})
