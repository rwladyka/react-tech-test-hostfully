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
      <div style={{ marginTop: 12 }}>
        <Meta
          title={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            place.price,
          )}
        />
      </div>
    </Card>
  )
}

export default PlaceCard
