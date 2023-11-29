import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { Booking } from '../types'
import { addBooking, saveBooking } from '../slicers/bookingSlicer'
import { message } from 'antd'
import { isDateBetween } from '../Utils/DateUtil'

const useSaveBooking = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const dispatch = useDispatch()
  const { currentBooking, bookings } = useSelector((state: RootState) => state.booking) as {
    currentBooking: Booking | null
    bookings: Booking[]
  }

  const isAValidBooking = (
    placeId: number,
    checkin: string | null,
    checkout: string | null,
    name?: string,
  ) => {
    if (!name || !checkin || !checkout) {
      messageApi.error({
        content: 'The form must be completed.',
      })
      return false
    }

    const hasDateConflict = bookings.some((booking) => {
      if (booking.id === currentBooking?.id) return false

      return (
        booking.placeId === placeId &&
        (isDateBetween(checkin, booking.checkin!, booking.checkout!) ||
          isDateBetween(checkout, booking.checkin!, booking.checkout!))
      )
    })

    if (hasDateConflict) {
      messageApi.error({
        content: 'A reservation with overlapping dates already exists.',
      })
      return false
    }

    return true
  }

  const save = (booking: Booking) => {
    if (currentBooking?.id) {
      dispatch(
        saveBooking({
          id: currentBooking.id,
          ...booking,
        }),
      )
    } else {
      dispatch(addBooking(booking))
    }

    messageApi.success({
      content: 'Your reservation has been successfully saved!',
    })
  }

  return {
    contextHolder,
    isAValidBooking,
    save,
  }
}

export default useSaveBooking
