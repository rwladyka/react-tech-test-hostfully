import { useDispatch, useSelector } from 'react-redux'
import placesJson from './assets/places.json'
import DateFilter from './components/DateFilter'
import Places from './components/Places'
import { Place } from './types'
import { RootState } from './store'
import { useMemo, useState } from 'react'
import EditModal from './components/RegisterModal'
import { checkDateBooking } from './Utils/DateUtil'
import Bookings from './components/Bookings'
import { editBooking } from './slicers/bookingSlicer'

function App() {
  const { bookings } = useSelector((state: RootState) => state.booking)
  const dispatch = useDispatch()
  const [filteredDates, setFilteredDates] = useState({ checkin: '', checkout: '' })

  const filterAvailablePlaces = (checkin: string, checkout: string) => {
    setFilteredDates({ checkin: checkin || '', checkout: checkout || '' })
  }

  const places = useMemo(() => {
    const { checkin, checkout } = filteredDates
    if (!checkin || !checkout) return placesJson

    return placesJson.filter(
      (place) =>
        !bookings.some(
          (booking) => booking.placeId === place.id && checkDateBooking(checkin, checkout, booking),
        ),
    )
  }, [bookings, filteredDates])

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
