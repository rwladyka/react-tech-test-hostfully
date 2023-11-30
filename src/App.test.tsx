import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import App from './App'
import { renderWithProviders } from './test/test-utils'

describe('initial test', () => {
  test('Renders the main page', () => {
    renderWithProviders(<App />)
    expect(screen.getByText('Choose a Place')).toBeInTheDocument()
    expect(screen.getByText('Bookings')).toBeInTheDocument()
  })
})
