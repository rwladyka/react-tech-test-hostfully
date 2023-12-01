import useSaveBooking from './useSaveBooking'
import { renderHook, waitFor } from '@testing-library/react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from '../store'
import { addBooking, saveBooking } from '../slicers/bookingSlicer'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('../slicers/bookingSlicer', () => ({
  addBooking: jest.fn(),
  saveBooking: jest.fn(),
}))

const mockDispatch = jest.fn()

describe('useSaveBooking()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useDispatch as jest.Mock).mockReturnValue(mockDispatch)
    ;(useSelector as jest.Mock).mockReturnValue({
      bookings: [
        {
          id: 1,
          name: 'John Doe',
          checkin: '12/01/2023',
          checkout: '12/10/2023',
          placeId: 1,
        },
      ],
      currentBooking: {
        id: 2,
        name: 'John Doe',
        checkin: '12/01/2023',
        checkout: '12/10/2023',
        placeId: 1,
      },
    })
  })

  it('should return the correct functions and context', async () => {
    const { result } = renderHook(() => useSaveBooking(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    })

    const { isAValidBooking, save } = result.current

    expect(isAValidBooking).toBeInstanceOf(Function)
    expect(save).toBeInstanceOf(Function)

    const isValid = isAValidBooking(1, '11/01/2023', '11/20/2023', 'John Doe')
    expect(isValid).toBeTruthy()

    const isNotValid = isAValidBooking(1, '12/01/2023', '12/20/2023', 'John Doe')
    expect(isNotValid).toBeFalsy()
  })

  it('should save edit booking', async () => {
    const { result } = renderHook(() => useSaveBooking(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    })

    const { save } = result.current

    save({
      id: 2,
      name: 'John Doe',
      checkin: '11/01/2023',
      checkout: '11/20/2023',
      placeId: 1,
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        saveBooking({
          id: 2,
          name: 'John Doe',
          checkin: '11/01/2023',
          checkout: '11/20/2023',
          placeId: 1,
        }),
      )
    })
  })

  it('should save new booking', async () => {
    const { result } = renderHook(() => useSaveBooking(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    })

    const { save } = result.current

    save({
      name: 'John Doe',
      checkin: '11/01/2023',
      checkout: '11/20/2023',
      placeId: 1,
    })

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        addBooking({
          name: 'John Doe',
          checkin: '11/01/2023',
          checkout: '11/20/2023',
          placeId: 1,
        }),
      )
    })
  })
})
