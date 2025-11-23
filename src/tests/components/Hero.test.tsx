import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import { Hero } from '@/components/Hero'

// Mock Supabase client
const mockGetSession = jest.fn()

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getSession: mockGetSession
    }
  }))
}))

// Mock next/navigation
const mockRefresh = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    push: jest.fn()
  })
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fill, priority, ...rest } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt="" />
  }
}))

// Mock next/link to avoid act warnings
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>{children}</a>
  )
}))

// Mock Counter component
jest.mock('@/components/Counter', () => ({
  Counter: ({ value }: { value: number }) => <span>{value}</span>
}))

// Mock MiniChart component
jest.mock('@/components/MiniChart', () => ({
  MiniChart: () => <div>MiniChart</div>
}))

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('triggers router refresh when user is detected client-side but missing from props', async () => {
    // Setup: Client-side session exists
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: '123' } } }
    })

    // Render with no user prop
    render(
      <Hero 
        user={null} 
        profile={null} 
        mileage={0} 
        transactions={[]} 
      />
    )

    // Expect router.refresh to be called
    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled()
    })
  })

  it('does not trigger refresh if no client-side session exists', async () => {
    // Setup: No client-side session
    mockGetSession.mockResolvedValue({
      data: { session: null }
    })

    render(
      <Hero 
        user={null} 
        profile={null} 
        mileage={0} 
        transactions={[]} 
      />
    )

    // Wait a bit to ensure effect runs
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(mockRefresh).not.toHaveBeenCalled()
  })

  it('does not trigger refresh if user prop is already present', async () => {
    // Setup: Client-side session exists
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: '123' } } }
    })

    // Render WITH user prop
    render(
      <Hero 
        user={{ id: '123', app_metadata: {}, user_metadata: {}, aud: 'authenticated', created_at: '' }} 
        profile={null} 
        mileage={0} 
        transactions={[]} 
      />
    )

    await new Promise(resolve => setTimeout(resolve, 100))

    expect(mockRefresh).not.toHaveBeenCalled()
  })
})
