import { Button, DatePicker, Flex, Input, Modal } from 'antd'
import { Booking, Place } from '../../types'
import { useEffect, useMemo, useState } from 'react'
import useSaveBooking from '../../hooks/useSaveBooking'
import PlaceImage from '../PlaceImage'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import placesJson from '../../assets/places.json'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../Utils/DateUtil'

type RegisterModalProps = {
  place: Place | null
  onClose: () => void
}

const RegisterModal = ({ place, onClose }: RegisterModalProps) => {
  const { isAValidBooking, save, contextHolder } = useSaveBooking()
  const { currentBooking } = useSelector((state: RootState) => state.booking) as {
    currentBooking: Booking | null
  }
  const [customerName, setCustomerName] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  const currentPlace = useMemo(() => {
    if (!place && !currentBooking) return null

    return place || (placesJson.find((json) => json.id === currentBooking?.id) as Place)
  }, [place, currentBooking])

  useEffect(() => {
    setCheckin(currentBooking?.checkin || '')
    setCheckout(currentBooking?.checkout || '')
    setCustomerName(currentBooking?.name || '')
  }, [currentBooking])

  const onSave = () => {
    if (!isAValidBooking(checkin, checkout, customerName)) return

    save({
      name: customerName,
      checkin,
      checkout,
      placeId: currentBooking?.placeId || place?.id!,
    })

    setCheckin('')
    setCheckout('')
    setCustomerName('')

    onClose()
  }

  return (
    <Modal
      title={currentPlace?.name}
      open={!!currentPlace}
      onCancel={onClose}
      footer={[
        <Button key='back' onClick={onClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={onSave}>
          Save
        </Button>,
      ]}
    >
      {contextHolder}
      <Flex justify='center' style={{ padding: '8px 0' }} vertical gap={12}>
        <div style={{ maxWidth: 240, margin: 'auto' }}>
          <PlaceImage place={currentPlace!} preview />
        </div>
        <Input
          placeholder='Customer Name'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <DatePicker.RangePicker
          placeholder={['Check in', 'Check out']}
          disabledDate={(currentDate) => currentDate.isBefore(Date.now())}
          value={
            checkin && checkout ? [dayjs(checkin, DATE_FORMAT), dayjs(checkout, DATE_FORMAT)] : null
          }
          onChange={(_, [startDate, endDate]) => {
            setCheckin(startDate)
            setCheckout(endDate)
          }}
          format='MM/DD/YYYY'
          allowClear
        />
      </Flex>
    </Modal>
  )
}

export default RegisterModal
