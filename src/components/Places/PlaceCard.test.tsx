import { act, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test/test-utils'
import placesJson from '../../assets/places.json'
import PlaceCard from './PlaceCard'
import userEvent from '@testing-library/user-event'

describe('<PlaceCard />', () => {
  const mockOnSelect = jest.fn()
  const place = placesJson[0]

  it('renders the PlaceCard component', () => {
    renderWithProviders(<PlaceCard place={place} onSelect={mockOnSelect} />)

    expect(screen.getByTestId(`place-card-${place.id}`)).toBeInTheDocument()
  })

  it('calls onSelect with the selected PlaceCard', async () => {
    renderWithProviders(<PlaceCard place={place} onSelect={mockOnSelect} />)

    act(() => {
      userEvent.click(screen.getByTestId(`place-card-${place.id}`))
    })

    await waitFor(() => {
      expect(mockOnSelect).toHaveBeenCalledWith(place)
    })
  })
})
