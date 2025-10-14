import "dotenv/config"
import { num, str } from "../utils/default"

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
  env: str(NODE_ENV, "development"),

  server: {
    port: num(PORT, 3000)
  },

  db: {
    host: str(DB_HOST, 'localhost'),
    port: num(DB_PORT, 5432),
    user: str(DB_USER, 'postgres'),
    password: str(DB_PASSWORD, ''),
    database: str(DB_DATABASE, 'mydb'),
  },

  security: {
    passwordSaltRounds: num(PASSWORD_SALT_ROUNDS, 10),
    jwtSecret: str(JWT_SECRET, 'default_jwt_secret'),
    jwtExpiresIn: str(JWT_EXPIRES_IN, '1d'),
  },
}

export default config
