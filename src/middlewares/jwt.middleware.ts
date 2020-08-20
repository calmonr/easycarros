import { RequestHandler } from 'express'
import expressJWT from 'express-jwt'

import { algorithm } from '../utils/jwt'

const { APPLICATION_KEY } = process.env

export const checkpoint = (): RequestHandler =>
  expressJWT({
    secret: APPLICATION_KEY as string,
    algorithms: [algorithm]
  })
