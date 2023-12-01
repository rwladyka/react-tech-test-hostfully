import { act, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test/test-utils'
import placesJson from '../../assets/places.json'
import userEvent from '@testing-library/user-event'
import Places from '.'

describe('<Places />', () => {
  const mockOnSelect = jest.fn()
  const place = placesJson[2]

  it('renders the Places component', () => {
    renderWithProviders(<Places places={placesJson} onSelect={mockOnSelect} />)

    expect(screen.getByText('Choose a Place')).toBeInTheDocument()
  })

  it('calls onSelect with the selected PlaceCard', async () => {
    renderWithProviders(<Places places={placesJson} onSelect={mockOnSelect} />)

    act(() => {
      userEvent.click(screen.getByTestId(`place-card-${place.id}`))
    })

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(place)
    })
  })
})
