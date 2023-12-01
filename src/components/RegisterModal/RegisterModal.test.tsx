import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { clearCurrentBooking } from '../../slicers/bookingSlicer'
import { renderWithProviders } from '../../test/test-utils'
import RegisterModal from '.'
import { useDispatch, useSelector } from 'react-redux'
import userEvent from '@testing-library/user-event'

jest.useFakeTimers().setSystemTime(new Date('2023-12-05'))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('../../slicers/bookingSlicer', () => ({
  deleteBooking: jest.fn(),
  editBooking: jest.fn(),
  clearCurrentBooking: jest.fn(),
}))

jest.mock('../../hooks/useSaveBooking', () => ({
  __esModule: true,
  default: jest
    .fn()
    .mockReturnValue({ isAValidBooking: () => true, save: jest.fn(), contextHolder: null }),
}))

const mockDispatch = jest.fn()

describe('<RegisterModal />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
    ;(useSelector as jest.Mock).mockReturnValue({
      bookings: [],
      currentBooking: {
        id: 1,
        name: 'John Doe',
        checkin: '12/01/2023',
        checkout: '12/10/2023',
        placeId: 1,
      },
    })
  })

  it('renders the RegisterModal component', async () => {
    renderWithProviders(<RegisterModal />)

    expect(screen.getByText('Wonderful Chalet')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('calls save and close modal', async () => {
    renderWithProviders(<RegisterModal />)

    userEvent.click(screen.getByText('Save'))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(clearCurrentBooking())
    })
  })

  it('change input values', async () => {
    renderWithProviders(<RegisterModal />)

    expect(screen.getByText('Wonderful Chalet')).toBeInTheDocument()

    fireEvent.input(screen.getByTestId('register-modal-input-name'), {
      target: { value: 'Jhonny Bravo' },
    })

    expect((screen.getByTestId('register-modal-input-name') as HTMLInputElement).value).toBe(
      'Jhonny Bravo',
    )
    act(() => {
      userEvent.click(screen.getByTestId('register-modal-range-dates').querySelectorAll('input')[0])
    })

    await waitFor(() => {
      expect(screen.getByText('Dec')).toBeInTheDocument()
    })

    userEvent.click(screen.getAllByText('13')[0])
    userEvent.click(screen.getAllByText('15')[0])

    await waitFor(() => {
      expect(
        screen.getByTestId('register-modal-range-dates').querySelectorAll('input')[0].value,
      ).toBe('12/13/2023')
      expect(
        screen.getByTestId('register-modal-range-dates').querySelectorAll('input')[1].value,
      ).toBe('12/15/2023')
    })
  })
})
