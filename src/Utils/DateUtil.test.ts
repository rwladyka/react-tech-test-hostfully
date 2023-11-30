import { checkDateBooking, daysDiff } from './DateUtil'
import { bookingMock } from '../test/mocks'

describe('DateUtil', () => {
  it.each([
    ['01/03/2023', '01/05/2023', bookingMock, true],
    ['01/06/2023', '01/09/2023', bookingMock, true],
    ['01/02/2023', '01/12/2023', bookingMock, true],
    ['01/13/2023', '01/15/2023', bookingMock, false],
    ['01/01/2023', '01/02/2023', bookingMock, false],
  ])(
    'should validate an overlap date with checkDateBooking. { checking: %s, checkout: %s }',
    (checkin, checkout, booking, expected) => {
      expect(checkDateBooking(checkin, checkout, booking)).toBe(expected)
    },
  )

  it.each([
    ['01/03/2023', '01/05/2023', 3],
    ['01/06/2023', '01/09/2023', 4],
    ['01/02/2023', '01/12/2023', 11],
    ['01/30/2023', '02/05/2023', 7],
    ['01/01/2023', '01/02/2023', 2],
  ])('should return the correct difference in days: %s - %s = %s', (startDate, endDate, qty) => {
    expect(daysDiff(startDate, endDate)).toBe(qty)
  })
})
