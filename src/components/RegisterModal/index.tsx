import { Button, DatePicker, Flex, Input, Modal } from 'antd'
import { Place } from '../../types'
import { useState } from 'react'
import useSaveBooking from '../../hooks/useSaveBooking'
import PlaceImage from '../PlaceImage'

type RegisterModalProps = {
  place: Place | null
  onClose: () => void
}

const RegisterModal = ({ place, onClose }: RegisterModalProps) => {
  const { isAValidBooking, save, contextHolder } = useSaveBooking()
  const [customerName, setCustomerName] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')

  const onSave = () => {
    if (!isAValidBooking(checkin, checkout, customerName)) return

    save({
      name: customerName,
      checkin,
      checkout,
      placeId: place?.id!,
    })

    setCheckin('')
    setCheckout('')
    setCustomerName('')

    onClose()
  }

  return (
    <Modal
      title={place?.name}
      open={!!place}
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
          <PlaceImage place={place!} preview />
        </div>
        <Input
          placeholder='Customer Name'
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <DatePicker.RangePicker
          placeholder={['Check in', 'Check out']}
          disabledDate={(currentDate) => currentDate.isBefore(Date.now())}
          onChange={(_, [startDate, endDate]) => {
            setCheckin(startDate)
            setCheckout(endDate)
          }}
          format='MM/DD/YYYY'
          allowClear
          showTime
        />
      </Flex>
    </Modal>
  )
}

export default RegisterModal
