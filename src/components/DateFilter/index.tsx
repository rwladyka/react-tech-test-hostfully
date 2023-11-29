import { DatePicker, Flex } from 'antd'
import { DATE_FORMAT } from '../../Utils/DateUtil'

type DateFilterProps = {
  onFilter: (startDate: string, endDate: string) => void
}

const DateFilter = ({ onFilter }: DateFilterProps) => {
  return (
    <Flex justify='center' style={{ padding: '8px 0' }}>
      <DatePicker.RangePicker
        placeholder={['Check in', 'Check out']}
        disabledDate={(currentDate) => currentDate.isBefore(Date.now())}
        onChange={(_, [startDate, endDate]) => onFilter(startDate, endDate)}
        format={DATE_FORMAT}
        allowClear
      />
    </Flex>
  )
}

export default DateFilter
