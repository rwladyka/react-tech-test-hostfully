import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const DATE_FORMAT = 'MM/DD/YYYY'

export const formatDate = (date: Dayjs) => date.format(DATE_FORMAT)

export const decodeDate = (date?: string) => {
  if (!date) return null

  return dayjs(date, DATE_FORMAT)
}

export const isDateBetween = (date: string, startDate: string, endDate: string) =>
  dayjs(date).isBetween(startDate, endDate, 'day', '[]')

export const daysDiff = (date1: string, date2: string) => {
  const day1 = dayjs(date1, DATE_FORMAT)
  const day2 = dayjs(date2, DATE_FORMAT)

  // sum 1 to count the first day
  return day2.diff(day1, 'day') + 1
}
