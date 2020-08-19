/// <reference path="../../typings/env.d.ts" />

import { join } from 'path'

export = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '..', 'modules', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  cli: {
    migrationsDir: join('src', 'database', 'migrations')
  }
}
