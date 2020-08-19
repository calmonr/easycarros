/// <reference path="../types/env.d.ts" />

import consola from 'consola'

import expressLoader from './loaders/express.loader'

const { SERVER_HOSTNAME, SERVER_PORT } = process.env

const bootstrap = async () => {
  const app = expressLoader()

  app.listen({ hostname: SERVER_HOSTNAME, port: SERVER_PORT }, () =>
    consola.success(
      `The server is running at http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    )
  )
}

bootstrap()
