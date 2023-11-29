import { useDispatch, useSelector } from 'react-redux'
import placesJson from './assets/places.json'
import DateFilter from './components/DateFilter'
import Places from './components/Places'
import { Place } from './types'
import { RootState } from './store'
import { useState } from 'react'
import EditModal from './components/RegisterModal'
import { isDateBetween } from './Utils/DateUtil'
import Bookings from './components/Bookings'
import { editBooking } from './slicers/bookingSlicer'

function App() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const dispatch = useDispatch()
  const [places, setPlaces] = useState(() => placesJson)

  const filterAvailablePlaces = (checkin: string, checkout: string) => {
    if (!checkin || !checkout) {
      setPlaces(placesJson)
      return
    }

    const filteredPlaces = placesJson.filter(
      (place) =>
        !bookings.some(
          (booking) =>
            booking.placeId === place.id &&
            (isDateBetween(checkin, booking.checkin, booking.checkout) ||
              isDateBetween(checkout, booking.checkin, booking.checkout) ||
              isDateBetween(booking.checkin, checkin, checkout) ||
              isDateBetween(booking.checkout, checkin, checkout)),
        ),
    )

    setPlaces(filteredPlaces)
  }

  const onSelectPlace = (place: Place) => {
    dispatch(
      editBooking({
        name: '',
        checking: '',
        checkout: '',
        placeId: place.id,
      }),
    )
  }

  return (
    <div style={{ maxWidth: 1240, margin: 'auto', padding: '32px 0' }}>
      <DateFilter onFilter={filterAvailablePlaces} />
      <Places places={places as Place[]} onSelect={onSelectPlace} />
      <EditModal />
      <Bookings />
    </div>
  )
}

export default App
