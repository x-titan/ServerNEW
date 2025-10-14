import Knex from "knex"

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} = process.env

const knex = Knex({
  client: "postgresql",
  connection: {
    host: String(DB_HOST)!,
    port: Number(DB_PORT),
    user: String(DB_USER),
    password: String(DB_PASSWORD),
    database: String(DB_DATABASE),
  },
  debug: false
})

export async function onDatabaseConnected() {
  return knex.raw("SELECT 1")
}

export default knex
