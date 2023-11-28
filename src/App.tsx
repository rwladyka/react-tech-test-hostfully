import { useSelector } from 'react-redux'
import placesJson from './assets/places.json'
import DateFilter from './components/DateFilter'
import Places from './components/Places'
import { Place } from './types'
import { RootState } from './store'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useState } from 'react'

dayjs.extend(isBetween)

function App() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const [places, setPlaces] = useState(() => placesJson)

  const filterAvailablePlaces = (startDate: string, endDate: string) => {
    const filteredPlaces = placesJson.filter(
      (place) =>
        !bookings.some(
          (booking) =>
            booking.placeId === place.id &&
            (dayjs(startDate).isBetween(booking.startDate, booking.endDate, 'day', '[]') ||
              dayjs(endDate).isBetween(booking.startDate, booking.endDate, 'day', '[]') ||
              dayjs(booking.startDate).isBetween(startDate, endDate, 'day', '[]') ||
              dayjs(booking.endDate).isBetween(startDate, endDate, 'day', '[]')),
        ),
    )
    setPlaces(filteredPlaces)
  }

  return (
    <>
      <DateFilter onFilter={filterAvailablePlaces} />
      <Places places={places as Place[]} />
    </>
  )
}

export default App
