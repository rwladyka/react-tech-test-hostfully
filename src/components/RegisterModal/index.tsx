import { Button, DatePicker, Flex, Input, Modal } from 'antd'
import { Booking } from '../../types'
import { useEffect, useState } from 'react'
import useSaveBooking from '../../hooks/useSaveBooking'
import PlaceImage from '../PlaceImage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../Utils/DateUtil'
import { getPlaceById } from '../../Utils/PlacesUtil'
import { clearCurrentBooking } from '../../slicers/bookingSlicer'

const RegisterModal = () => {
  const { isAValidBooking, save, contextHolder } = useSaveBooking()
  const dispatch = useDispatch()
  const { currentBooking } = useSelector((state: RootState) => state.booking) as {
    currentBooking: Booking | null
  }

  const [customerName, setCustomerName] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  const currentPlace = getPlaceById(currentBooking?.placeId!)

  useEffect(() => {
    setCheckin(currentBooking?.checkin!)
    setCheckout(currentBooking?.checkout!)
    setCustomerName(currentBooking?.name!)
  }, [currentBooking])

  const closeModal = () => {
    dispatch(clearCurrentBooking())
  }

  const onSave = () => {
    if (!isAValidBooking(currentBooking?.placeId!, checkin, checkout, customerName)) return

    save({
      name: customerName,
      checkin,
      checkout,
      placeId: currentBooking?.placeId!,
    })

    setCheckin('')
    setCheckout('')
    setCustomerName('')

    closeModal()
  }

  return (
    <Modal
      title={currentPlace?.name}
      open={!!currentBooking}
      onCancel={closeModal}
      footer={[
        <Button key='back' onClick={closeModal}>
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
          data-testid='register-modal-input-name'
          placeholder='Customer Name'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <DatePicker.RangePicker
          data-testid='register-modal-range-dates'
          placeholder={['Check in', 'Check out']}
          disabledDate={(currentDate) => currentDate.isBefore(Date.now())}
          value={
            checkin && checkout ? [dayjs(checkin, DATE_FORMAT), dayjs(checkout, DATE_FORMAT)] : null
          }
          onChange={(_, [startDate, endDate]) => {
            setCheckin(startDate)
            setCheckout(endDate)
          }}
          format={DATE_FORMAT}
          allowClear
        />
      </Flex>
    </Modal>
  )
}

export default RegisterModal
