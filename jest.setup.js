import '@testing-library/jest-dom'

// Polyfill for TextEncoder/TextDecoder required by Next.js in test environment
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}

// Polyfill for Web APIs required by Next.js
if (typeof global.Request === 'undefined') {
  global.Request = class Request {}
  global.Response = class Response {}
  global.Headers = class Headers {}
}

// Mock fetch if not available
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn()
}
