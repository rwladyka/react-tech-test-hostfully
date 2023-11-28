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
  startDate: string
  endDate: string
  placeId: number
}
