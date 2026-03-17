/*
|--------------------------------------------------------------------------
| Environment variables service
|--------------------------------------------------------------------------
|
| The `Env.create` method creates an instance of the Env service. The
| service validates the environment variables and also cast values
| to JavaScript data types.
|
*/

import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  // Node
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  HOST: Env.schema.string.optional({ format: 'host' }),
  LOG_LEVEL: Env.schema.string.optional(),
  APP_NAME: Env.schema.string.optional(),

  // App
  APP_KEY: Env.schema.string.optional(),
  APP_URL: Env.schema.string.optional({ format: 'url', tld: false }),

  // Session
  SESSION_DRIVER: Env.schema.enum.optional(['cookie', 'memory', 'database'] as const),

  // Database
  DATABASE_URL: Env.schema.string(),
  DB_SSL: Env.schema.boolean.optional(),

  // Frontend
  CORS_ORIGIN: Env.schema.string.optional(),

  // Internal communication
  INTERNAL_API_TOKEN: Env.schema.string(),
  DEFAULT_MAX_ACCOUNTS_PER_CONTAINER: Env.schema.number.optional(),

  // Accounts nodes bootstrap
  SERVICE_NODES_BOOTSTRAP_ENABLED: Env.schema.boolean.optional(),
  SERVICE_NODES_START: Env.schema.number.optional(),
  SERVICE_NODES_END: Env.schema.number.optional(),
  SERVICE_NODES_CODE_PREFIX: Env.schema.string.optional(),
  SERVICE_NODES_NAME_PREFIX: Env.schema.string.optional(),
  SERVICE_NODES_HOST_PREFIX: Env.schema.string.optional(),
  SERVICE_NODES_HOST_SUFFIX: Env.schema.string.optional(),
  SERVICE_NODES_PROTOCOL: Env.schema.enum.optional(['http', 'https'] as const),
  SERVICE_NODES_PORT: Env.schema.number.optional(),
  SERVICE_NODES_MAX_ACCOUNTS: Env.schema.number.optional(),
})
