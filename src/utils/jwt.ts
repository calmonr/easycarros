import { sign, Algorithm } from 'jsonwebtoken'

const { APPLICATION_KEY } = process.env

export const algorithm: Algorithm = 'HS256'

export const generateJWT = (
  data: Record<string, unknown>,
  expiresIn: string | number
): { token: string } => {
  const token = sign(data, APPLICATION_KEY, {
    algorithm,
    expiresIn
  })

  return { token }
}
