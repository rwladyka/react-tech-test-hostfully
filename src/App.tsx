import { useSelector } from 'react-redux'
import placesJson from './assets/places.json'
import DateFilter from './components/DateFilter'
import Places from './components/Places'
import { Place } from './types'
import { RootState } from './store'
import { useState } from 'react'
import EditModal from './components/RegisterModal'
import { isDateBetween } from './Utils/DateUtil'

function App() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const [places, setPlaces] = useState(() => placesJson)
  const [place, setPlace] = useState<Place | null>(null)

  const filterAvailablePlaces = (checkin: string, checkout: string) => {
    const filteredPlaces = placesJson.filter(
      (place) =>
        !bookings.some(
          (booking) =>
            (booking.placeId === place.id &&
              isDateBetween(checkin, booking.checkin, booking.checkout)) ||
            isDateBetween(checkout, booking.checkin, booking.checkout) ||
            isDateBetween(booking.checkin, checkin, checkout) ||
            isDateBetween(booking.checkout, checkin, checkout),
        ),
    )
    setPlaces(filteredPlaces)
  }

  return (
    <>
      <DateFilter onFilter={filterAvailablePlaces} />
      <Places places={places as Place[]} onSelect={setPlace} />
      <EditModal place={place} onClose={() => setPlace(null)} />
    </>
  )
}

export default App
