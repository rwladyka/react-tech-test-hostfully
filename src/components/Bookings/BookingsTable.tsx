import { Button, Popconfirm, Space, Table, message } from 'antd'
import { Booking } from '../../types'
import { ColumnsType } from 'antd/lib/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteBooking, editBooking } from '../../slicers/bookingSlicer'
import { getPlaceById } from '../../Utils/PlacesUtil'
import { daysDiff } from '../../Utils/DateUtil'
import { formatCurrency } from '../../Utils/CurrencyUtil'

type BookingsTableProps = {
  bookings: Booking[]
}

const BookingsTable = ({ bookings }: BookingsTableProps) => {
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()

  const handleDelete = (booking: Booking) => {
    dispatch(deleteBooking(booking))
    messageApi.success({
      content: 'The reservation has been successfully deleted!',
    })
  }

  const handleEdit = (booking: Booking) => {
    dispatch(editBooking(booking))
  }

  const columns: ColumnsType<Booking> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Place',
      key: 'place',
      render: (data) => {
        return <>{getPlaceById(data.placeId)?.name}</>
      },
    },
    {
      title: 'Check In',
      dataIndex: 'checkin',
      key: 'checkin',
    },
    {
      title: 'Checkout',
      dataIndex: 'checkout',
      key: 'checkout',
    },
    {
      title: 'Total',
      key: 'total',
      render: (data) => {
        return (
          <>
            {formatCurrency(
              getPlaceById(data.placeId)?.price * daysDiff(data.checkin, data.checkout),
            )}
          </>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (data) => (
        <Space size='middle' key={data.id}>
          <Button
            type='primary'
            shape='circle'
            icon={<EditOutlined />}
            onClick={() => handleEdit(data)}
            data-testid={`edit-booking-${data.id}`}
          />
          <Popconfirm
            title={null}
            description='Are you sure to delete this Booking?'
            onConfirm={() => handleDelete(data)}
            okText='Yes'
            cancelText='No'
            placement='topRight'
          >
            <Button
              type='primary'
              shape='circle'
              icon={<DeleteOutlined />}
              danger
              data-testid={`delete-booking-${data.id}`}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '0 32px' }}>
      {contextHolder}
      <Table columns={columns} dataSource={bookings} scroll={{ x: 600 }} />
    </div>
  )
}

export default BookingsTable
