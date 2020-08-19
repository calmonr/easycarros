declare namespace NodeJS {
  export interface ProcessEnv {
    APPLICATION_KEY: string
    SERVER_HOSTNAME: string
    SERVER_PORT: number
    DATABASE_HOST: string
    DATABASE_PORT: number
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_NAME: string
    OPENCAGE_API: string
  }
}
