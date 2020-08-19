import Geocoder from 'node-geocoder'

import { CoordinatesType } from '../types/coordinates.type'

const { OPENCAGE_API } = process.env

const geocoder = Geocoder({
  provider: 'opencage',
  apiKey: OPENCAGE_API
})

export const forwardGeocode = async (
  address: string
): Promise<CoordinatesType> => {
  const [first] = await geocoder.geocode(address)

  const { longitude = 0, latitude = 0 } = first

  return { longitude, latitude }
}
