import { Card } from 'antd'
import { Place } from '../../types'
import Meta from 'antd/es/card/Meta'
import PlaceImage from '../PlaceImage'

type PlaceCardProps = {
  place: Place
  onSelect: (place: Place) => void
}

const PlaceCard = ({ place, onSelect }: PlaceCardProps) => {
  return (
    <Card
      key={place.id}
      hoverable
      style={{ width: 240 }}
      cover={<PlaceImage place={place} />}
      onClick={() => onSelect(place)}
    >
      <Meta title={place.name} description={place.city} />
    </Card>
  )
}

export default PlaceCard
