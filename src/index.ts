/// <reference path="../types/env.d.ts" />

import 'reflect-metadata'
import consola from 'consola'

import databaseLoader from './loaders/database.loader'
import expressLoader from './loaders/express.loader'

const { SERVER_HOSTNAME, SERVER_PORT } = process.env

const bootstrap = async () => {
  await databaseLoader()

  const app = expressLoader()

  app.listen({ hostname: SERVER_HOSTNAME, port: SERVER_PORT }, () =>
    consola.success(
      `The server is running at http://${SERVER_HOSTNAME}:${SERVER_PORT}`
    )
  )
}

bootstrap()
