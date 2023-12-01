import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test/test-utils'
import PlaceImage from '.'
import placesJson from '../../assets/places.json'

describe('<PlaceImage />', () => {
  it('renders the PlaceImage component', () => {
    renderWithProviders(<PlaceImage place={placesJson[0]} />)

    expect(screen.getByTestId('place-image')).toBeInTheDocument()
  })
})
