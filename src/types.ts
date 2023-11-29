export type Place = {
  id: number
  name: string
  shortDescription: string
  image: string
  price: number
  city: string
}

export type Booking = {
  id?: number
  key?: number
  name: string
  checkin: string
  checkout: string
  placeId: number
}
