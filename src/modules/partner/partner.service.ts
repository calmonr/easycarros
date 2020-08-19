import { Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Repository } from 'typeorm'
import { Point } from 'geojson'

import { Partner } from './partner.entity'
import { CoordinatesType } from '../../types/coordinates.type'

@Service()
export class PartnerService {
  @InjectRepository(Partner)
  private repository!: Repository<Partner>

  private closestByRadiusQuery(
    { longitude, latitude }: CoordinatesType,
    distance: number
  ) {
    const coordinates: Point = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    const query = this.repository
      .createQueryBuilder()
      .where(
        'ST_DWithin(coordinates, ST_GeomFromGeoJSON(:coordinates)::geography, :distance)'
      )
      .orderBy({
        'ST_Distance(coordinates, ST_GeomFromGeoJSON(:coordinates))': {
          order: 'ASC',
          nulls: 'NULLS FIRST'
        }
      })
      .setParameters({ coordinates, distance })

    return query
  }

  async findByService(
    service: string,
    coordinates: CoordinatesType,
    distance: number
  ): Promise<Partner | undefined> {
    const partner = await this.closestByRadiusQuery(coordinates, distance)
      .andWhere(':service = ANY(services)', { service })
      .getOne()

    return partner
  }
}
