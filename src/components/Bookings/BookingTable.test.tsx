import { act, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import BookingsTable from './BookingsTable'
import { renderWithProviders } from '../../test/test-utils'
import { bookingMock } from '../../test/mocks'
import { getPlaceById } from '../../Utils/PlacesUtil'
import { deleteBooking, editBooking } from '../../slicers/bookingSlicer'
import userEvent from '@testing-library/user-event'
import { useDispatch } from 'react-redux'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('../../slicers/bookingSlicer', () => ({
  deleteBooking: jest.fn(),
  editBooking: jest.fn(),
}))

const mockDispatch = jest.fn()

describe('<BookingsTable />', () => {
  beforeEach(() => {
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
    jest.clearAllMocks()
  })

  it('renders the table with the correct columns and data', () => {
    renderWithProviders(<BookingsTable bookings={[bookingMock]} />)
    expect(screen.getByText(bookingMock.name)).toBeInTheDocument()
    expect(screen.getByText(bookingMock.checkin)).toBeInTheDocument()
    expect(screen.getByText(bookingMock.checkout)).toBeInTheDocument()
    expect(screen.getByText(getPlaceById(bookingMock.placeId).name)).toBeInTheDocument()
  })

  it('calls dispatch and shows success message on delete button click', async () => {
    renderWithProviders(<BookingsTable bookings={[bookingMock]} />)
    act(() => {
      userEvent.click(screen.getByTestId('delete-booking-1'))
    })
    await waitFor(() => {
      expect(screen.getByText('Are you sure to delete this Booking?')).toBeInTheDocument()
    })
    act(() => {
      userEvent.click(screen.getByText('Yes'))
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(deleteBooking(bookingMock))
      expect(screen.getByText(/successfully deleted/i)).toBeInTheDocument()
    })
  })

  it('calls dispatch on edit button click', async () => {
    renderWithProviders(<BookingsTable bookings={[bookingMock]} />)

    userEvent.click(screen.getByTestId('edit-booking-1'))
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(editBooking(bookingMock))
    })
  })
})
