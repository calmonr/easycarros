import { sign, Algorithm } from 'jsonwebtoken'
import ms from 'ms'

const { APPLICATION_KEY } = process.env

export const algorithm: Algorithm = 'HS256'

export const generateJWT = (
  userId: number
): { token: string; expiresIn: number } => {
  const expiresIn = ms('1h')
  const token = sign({ userId }, APPLICATION_KEY, { algorithm, expiresIn })

  return { expiresIn, token }
}
