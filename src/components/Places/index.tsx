import { Flex, Typography } from 'antd'
import { Place } from '../../types'
import Title from 'antd/es/typography/Title'
import theme from '../../config/defaultSettings'
import PlaceCard from './PlaceCard'

type PlacesProps = {
  places: Place[]
  onSelect: (place: Place) => void
}

const Places = ({ places, onSelect }: PlacesProps) => {
  return (
    <>
      <Typography>
        <Title level={2} style={{ color: theme.colorPrimary, margin: '16px' }}>
          Choose a Place
        </Title>
      </Typography>
      <Flex gap='middle' justify='center' wrap='wrap'>
        {places.map((place) => (
          <PlaceCard place={place} onSelect={onSelect} />
        ))}
      </Flex>
    </>
  )
}

export default Places
