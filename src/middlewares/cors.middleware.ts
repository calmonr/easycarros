import { RequestHandler } from 'express'
import cors from 'cors'

export const options = {
  origin: [/localhost/],
  credentials: true
}

export default (): RequestHandler => cors(options)
