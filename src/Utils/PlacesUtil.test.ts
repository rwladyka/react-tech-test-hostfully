import { getPlaceById } from './PlacesUtil'

describe('PlacesUtil', () => {
  it('should return the correct place for a valid ID', () => {
    expect(getPlaceById(3)).toEqual({
      id: 3,
      name: 'Breathtaking View',
      shortDescription:
        'The place has a breathtaking view of the entire beachfront of Balneário Camboriú.',
      image: 'https://a0.muscache.com/im/pictures/4227633c-20e6-409a-afda-70aab275dfba.jpg',
      price: 650,
      city: 'Pioneiros, Brazil',
    })
  })

  it('should return undefined for an invalid ID', () => {
    expect(getPlaceById(99)).toBeUndefined()
  })
})
