import { Place } from '../../types'
import { Image } from 'antd'

type PlaceImageProps = {
  place: Place
  preview?: boolean
}

const PlaceImage = ({ place, preview = false }: PlaceImageProps) => (
  <Image
    alt={place.shortDescription}
    src={place.image}
    style={{ maxHeight: 160 }}
    preview={preview}
  />
)

export default PlaceImage
