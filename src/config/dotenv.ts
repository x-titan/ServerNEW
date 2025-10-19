import assert from "assert"
import "dotenv/config"
import { ensureNumber, ensureString } from "../utils/ensure"

const {
  NODE_ENV,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  PASSWORD_SALT_ROUNDS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env

const config = {
  env: ensureString(NODE_ENV, "development"),
  isDevelopment: NODE_ENV === "development",
  isProduction: NODE_ENV === "production",

  server: {
    port: ensureNumber(PORT, 3000)
  },

  db: {
    host: ensureString(DB_HOST, 'localhost'),
    port: ensureNumber(DB_PORT, 5432),
    user: ensureString(DB_USER, 'postgres'),
    password: ensureString(DB_PASSWORD, ''),
    database: ensureString(DB_DATABASE, 'mydb'),
  },

  security: {
    passwordSaltRounds: ensureNumber(PASSWORD_SALT_ROUNDS, 10),
    jwtSecret: ensureString(JWT_SECRET, 'default_jwt_secret'),
    jwtExpiresIn: ensureString(JWT_EXPIRES_IN, '1d'),
  },
}

function validateProductionConfig(isProduction: boolean) {
  if (!isProduction) return

  const missing = Object
    .entries({
      JWT_SECRET,
      DB_PASSWORD,
      DB_USER,
      DB_HOST,
    })
    .filter((_, value) => (!value))
    .map(([key]) => (key))

  assert(
    missing.length === 0,
    `Missing required environment variables in production: ${missing.join(", ")}.\n`
    + "Please set these variables in .env file or environment.")
  assert(
    JWT_SECRET && JWT_SECRET.length > 32,
    "JWT_SECRET must be at least 32 characters long in production. Current length: "
    + (JWT_SECRET?.length || 0))
}

validateProductionConfig(config.isProduction)

export default config
