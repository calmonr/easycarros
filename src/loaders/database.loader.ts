import { createConnection, ConnectionOptions, Connection } from 'typeorm'

import { User } from '../modules/user/user.entity'

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
  entities: [User]
}

export default (): Promise<Connection> => {
  return createConnection(options)
}
