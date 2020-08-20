import { Container } from 'typedi'
import {
  ConnectionOptions,
  Connection,
  useContainer,
  createConnection
} from 'typeorm'

import config from '../database/config'

export default (): Promise<Connection> => {
  useContainer(Container)

  return createConnection(config as ConnectionOptions)
}
