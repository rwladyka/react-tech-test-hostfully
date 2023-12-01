import configureMockStore from 'redux-mock-store'
import {
  addBooking,
  clearCurrentBooking,
  deleteBooking,
  editBooking,
  saveBooking,
} from './bookingSlicer'

const mockStore = configureMockStore()

describe('Booking Reducer', () => {
  let store: ReturnType<typeof mockStore>

  beforeEach(() => {
    store = mockStore({
      booking: {
        bookings: [],
        currentBooking: null,
      },
    })
  })

  it('should add a booking', () => {
    const booking = { name: 'John Doe', checkin: '2023-01-01', checkout: '2023-01-10' }
    const expectedActions = [{ type: addBooking.type, payload: booking }]

    store.dispatch(addBooking(booking))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should clear current booking', () => {
    const expectedActions = [{ type: clearCurrentBooking.type }]

    store.dispatch(clearCurrentBooking())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should delete a booking', () => {
    const bookingId = 1
    const expectedActions = [{ type: deleteBooking.type, payload: { id: bookingId } }]

    store.dispatch(deleteBooking({ id: bookingId }))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should edit a booking', () => {
    const booking = { id: 1, name: 'John Doe', checkin: '2023-01-01', checkout: '2023-01-10' }
    const expectedActions = [{ type: editBooking.type, payload: booking }]

    store.dispatch(editBooking(booking))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should save a booking', () => {
    const booking = { id: 1, name: 'John Doe', checkin: '2023-01-01', checkout: '2023-01-10' }
    const expectedActions = [{ type: saveBooking.type, payload: booking }]

    store.dispatch(saveBooking(booking))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
