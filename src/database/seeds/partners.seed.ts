import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Point } from 'geojson'

import { Partner } from '../../modules/partner/partner.entity'
import { ServiceType } from '../../types/service.type'
import partners from './mocks/partners.json'

export default class PartnersSeeder implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    const mocks = partners.map(partner => {
      const {
        services,
        location: {
          coordinates: { longitude, latitude }
        }
      } = partner

      const point: Point = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      return {
        ...partner,
        services: services as ServiceType[],
        coordinates: point
      }
    })

    await connection
      .createQueryBuilder()
      .insert()
      .into(Partner)
      .values(mocks)
      .execute()
  }
}
