import { Container } from 'typedi'
import {
  ConnectionOptions,
  Connection,
  useContainer,
  createConnection
} from 'typeorm'

import { User } from '../modules/user/user.entity'
import { Partner } from '../modules/partner/partner.entity'

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME
} = process.env

const options: ConnectionOptions = {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  type: 'postgres',
  synchronize: true,
  logging: true,
  entities: [User, Partner]
}

export default (): Promise<Connection> => {
  useContainer(Container)

  return createConnection(options)
}
