import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { Booking } from '../types'

dayjs.extend(isBetween)

export const DATE_FORMAT = 'MM/DD/YYYY'

/**
 * Checks if a given date is between a start date and an end date (inclusive).
 *
 * @param {string} date - The date to check in the format 'MM/DD/YYYY'.
 * @param {string} startDate - The start date in the format 'MM/DD/YYYY'.
 * @param {string} endDate - The end date in the format 'MM/DD/YYYY'.
 * @returns {boolean} `true` if the given date is between the start and end dates (inclusive), `false` otherwise.
 *
 * @example
 * const result = isDateBetween('01/05/2023', '01/01/2023', '01/10/2023');
 * // Result: true
 */
const isDateBetween = (date: string, startDate: string, endDate: string) =>
  dayjs(date).isBetween(startDate, endDate, 'day', '[]')

/**
 * Checks if a booking overlaps with a specified date range.
 *
 * @param {string} checkin - The check-in date in the format 'MM/DD/YYYY'.
 * @param {string} checkout - The check-out date in the format 'MM/DD/YYYY'.
 * @param {Booking} booking - The booking object with 'checkin' and 'checkout' dates.
 * @returns {boolean} `true` if the booking overlaps with the specified date range, `false` otherwise.
 *
 * @example
 * const booking = { checkin: '01/05/2023', checkout: '01/10/2023' };
 * const result = checkDateBooking('01/03/2023', '01/07/2023', booking);
 * // Result: true (overlap on '01/05/2023' and '01/07/2023')
 */
export const checkDateBooking = (checkin: string, checkout: string, booking: Booking) => {
  return (
    isDateBetween(checkin, booking.checkin, booking.checkout) ||
    isDateBetween(checkout, booking.checkin, booking.checkout) ||
    isDateBetween(booking.checkin, checkin, checkout) ||
    isDateBetween(booking.checkout, checkin, checkout)
  )
}

/**
 * Calculates the difference in days between two dates.
 *
 * @param {string} date1 - The first date string in the format 'MM/DD/YYYY'.
 * @param {string} date2 - The second date string in the format 'MM/DD/YYYY'.
 * @returns {number} The difference in days between the two dates, including both the start and end dates.
 *
 * @example
 * const result = daysDiff('01/01/2023', '01/10/2023');
 * // Result: 10 (including both the start and end dates)
 */
export const daysDiff = (date1: string, date2: string) => {
  const day1 = dayjs(date1, DATE_FORMAT)
  const day2 = dayjs(date2, DATE_FORMAT)

  // sum 1 to count the first day
  return day2.diff(day1, 'day') + 1
}
