import express, { Express } from 'express'
import responseTime from 'response-time'

export default (): Express => {
  const app = express()

  app.disable('x-powered-by')

  app.use(responseTime())

  app.get('/hello', (_req, res) => res.json({ hello: 'world' }))

  return app
}
