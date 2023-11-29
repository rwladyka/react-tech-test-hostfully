import placesJson from '../assets/places.json'
import { Place } from '../types'

export const getPlaceById = (placeId: number) =>
  placesJson.find((json) => json.id === placeId) as Place
