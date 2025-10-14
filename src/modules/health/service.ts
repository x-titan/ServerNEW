import { onDatabaseConnected } from "../../config/knex"

export async function checkDatabaseConnection() {
  return (
    await onDatabaseConnected()
      ? { status: "ok" }
      : { status: "error" }
  )
}

export async function checkDatabaseHealth() {
  return (
    await onDatabaseConnected()
      ? 200
      : 500
  )
}
