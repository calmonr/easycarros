import express, { Express } from 'express'
import { json } from 'body-parser'
import responseTime from 'response-time'

import cors from '../middlewares/cors.middleware'
import routes from '../routes'
import error from '../middlewares/error.middleware'

export default (): Express => {
  const app = express()

  app.disable('x-powered-by')

  app.use(cors())
  app.use(json())
  app.use(responseTime())

  app.use(routes)

  app.use(error())

  return app
}
