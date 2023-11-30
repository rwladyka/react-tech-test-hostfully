import placesJson from '../assets/places.json'
import { Place } from '../types'

/**
 * Retrieves a place object by its unique identifier.
 *
 * @param {number} placeId - The unique identifier of the place.
 * @returns {Place | undefined} The place object with the specified ID, or undefined if not found.
 *
 * @example
 * const place = getPlaceById(1);
 * // Result: { id: 1, name: 'Example Place', shortDescription: 'A description', image: 'example.jpg', price: 100, city: 'Example City' }
 */
export const getPlaceById = (placeId: number) =>
  placesJson.find((json) => json.id === placeId) as Place
