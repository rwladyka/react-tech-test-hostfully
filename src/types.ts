export type Place = {
  id: number
  name: string
  shortDescription: string
  image: string
  value: number
  city: string
}

export type Booking = {
  id?: number
  name: string
  checkin: string
  checkout: string
  placeId: number
}
