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
  debug: false
})

export async function onDatabaseConnected() {
  try {
    await knex.raw("SELECT 1")
    console.log("Database connection verified")
  } catch (error) {
    console.error("Database")
    throw new Error(`Failed to connect to database: ${error}`)
  }

  return knex.raw("SELECT 1")
}

export default knex
