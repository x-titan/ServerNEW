import "dotenv/config"
import knex, { onDatabaseConnected } from "./config/knex"
import trytocatch from "try-to-catch"
import { register } from "./services/user"

async function main(args?: string) {
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully")
  await register({
    username: "admin1",
    password: "Admin@1234"
  })
  console.log("123")
}

main()
  .catch((err) => console.error("Fatal error: ", err))
