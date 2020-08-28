import { geocode } from 'opencage-api-client'

import { CoordinatesType } from '../types/coordinates.type'

const { OPENCAGE_API } = process.env

export const forwardGeocode = async (
  address: string
): Promise<CoordinatesType> => {
  const {
    results: [first]
  } = await geocode({ q: address, key: OPENCAGE_API })

  const {
    geometry: { lng: longitude, lat: latitude }
  } = first || { geometry: { lng: 0, lat: 0 } }

  return { longitude, latitude }
}
