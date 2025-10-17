import { onDatabaseConnected } from "../../config/knex"

export async function checkDatabaseConnection() {
  try {
    await onDatabaseConnected()
    return true
  } catch (error) {
    return false
  }
}
