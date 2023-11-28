import dayjs, { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

const DATE_FORMAT = 'MM/DD/YYYY'

export const formatDate = (date: Dayjs) => date.format(DATE_FORMAT)

export const decodeDate = (date?: string) => {
  if (!date) return null

  return dayjs(date, DATE_FORMAT)
}
