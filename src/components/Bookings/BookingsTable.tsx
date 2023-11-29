import { Button, Popconfirm, Space, Table, message } from 'antd'
import { Booking } from '../../types'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteBooking, editBooking } from '../../slicers/bookingSlicer'

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
          />
          <Popconfirm
            title={null}
            description='Are you sure to delete this Booking?'
            onConfirm={() => handleDelete(data)}
            okText='Yes'
            cancelText='No'
            placement='topRight'
          >
            <Button type='primary' shape='circle' icon={<DeleteOutlined />} danger />
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
