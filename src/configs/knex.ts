import Knex from "knex"
import config from "./dotenv"

const {
  host,
  port,
  user,
  password,
  database,
} = config.db

const knex = Knex({
  client: "postgresql",
  connection: {
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
  },

  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    createTimeoutMillis: 3000,
    createRetryIntervalMillis: 100,
  },

  debug: config.isDevelopment,
  log: {
    warn(message) { console.warn("[KNEX] warn:", message) },
    error(message) { console.error("[KNEX] error:", message) },
    deprecate(message) { console.warn("[KNEX] deprecation:", message) },
    debug(message) {
      if (config.isDevelopment)
        console.log("[KNEX] debug:", message)
    }
  }
})

export async function onDatabaseConnected() {
  return knex.raw("SELECT 1")
}

export async function closeDatabase() {
  try {
    await knex.destroy()
  } catch (error) {
    console.log("Error closing database knex:", error)
    throw error
  }
}

export async function checkDatabaseHealth() {
  try {
    await onDatabaseConnected()
    return true
  } catch (error) {
    return false
  }
}

export default knex
