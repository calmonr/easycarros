/// <reference path="../../typings/env.d.ts" />

export = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [`${__dirname}/../modules/**/*{js,ts}`],
  migrations: [`${__dirname}/migrations/*{ts,js}`],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}
