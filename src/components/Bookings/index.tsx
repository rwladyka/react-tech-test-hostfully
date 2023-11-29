import Title from 'antd/es/typography/Title'
import theme from '../../config/defaultSettings'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import BookingsTable from './BookingsTable'

const Bookings = () => {
  const { bookings } = useSelector((state: RootState) => state.booking)

  return (
    <>
      <Title level={2} style={{ color: theme.colorPrimary, margin: '16px' }}>
        Bookings
      </Title>
      <BookingsTable bookings={bookings} />
    </>
  )
}

export default Bookings
