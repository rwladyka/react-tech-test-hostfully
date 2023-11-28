import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('initial test', () => {
  test('Renders the main page', () => {
    render(<App />)
    expect(screen.getByText('Choose a Place')).toBeInTheDocument()
  })
})
