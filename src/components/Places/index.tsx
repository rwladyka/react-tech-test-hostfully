import { Card, Flex, Image, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'
import { Place } from '../../types'
import Title from 'antd/es/typography/Title'
import theme from '../../config/defaultSettings'

type PlacesProps = {
  places: Place[]
}

const Places = ({ places }: PlacesProps) => {
  return (
    <>
      <Typography>
        <Title level={2} style={{ color: theme.colorPrimary }}>
          Choose a Place
        </Title>
      </Typography>
      <Flex gap='middle' justify='center' wrap='wrap'>
        {places.map((place) => (
          <Card
            key={place.id}
            hoverable
            style={{ width: 240 }}
            cover={
              <Image
                alt={place.shortDescription}
                src={place.image}
                style={{ maxHeight: 160 }}
                preview={false}
              />
            }
            onClick={() => alert('clicked!')}
          >
            {place.id}
            <Meta title={place.name} description={place.city} />
          </Card>
        ))}
      </Flex>
    </>
  )
}

export default Places
