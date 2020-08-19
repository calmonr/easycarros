import { sign } from 'jsonwebtoken'
import ms from 'ms'

const { APPLICATION_KEY } = process.env

export const generateJWT = (
  userId: number
): { token: string; expiresIn: number } => {
  const expiresIn = ms('1h')
  const token = sign({ userId }, APPLICATION_KEY, { expiresIn })

  return {
    expiresIn,
    token
  }
}
