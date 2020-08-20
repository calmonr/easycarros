import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Point } from 'geojson'
import { Exclude, Transform } from 'class-transformer'

import { ServiceType } from '../../types/service.type'

@Entity({
  name: 'partners'
})
export class Partner extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column('text', { array: true })
  services!: ServiceType[]

  @Transform(value => [...value.coordinates], { toPlainOnly: true })
  @Column('geometry', {
    spatialFeatureType: 'Point'
  })
  @Index({ spatial: true })
  coordinates!: Point

  @Exclude()
  @CreateDateColumn()
  created_at!: Date

  @Exclude()
  @UpdateDateColumn()
  updated_at!: Date
}
