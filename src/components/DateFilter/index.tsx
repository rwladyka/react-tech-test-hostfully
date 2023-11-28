import { DatePicker, Flex } from 'antd'

type DateFilterProps = {
  onFilter: (startDate: string, endDate: string) => void
}

const DateFilter = ({ onFilter }: DateFilterProps) => {
  return (
    <Flex gap='middle' justify='center'>
      <DatePicker.RangePicker
        placeholder={['Check in', 'Check out']}
        disabledDate={(currentDate) => currentDate.isBefore(Date.now())}
        onChange={(_, [startDate, endDate]) => onFilter(startDate, endDate)}
        format='MM/DD/YYYY'
        bordered={false}
        allowClear
        showTime
      />
    </Flex>
  )
}

export default DateFilter
