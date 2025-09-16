import "dotenv/config"
import knex, { onDatabaseConnected } from "./config/knex"
import trytocatch from "try-to-catch"

async function main(args: string | undefined) {
  await onDatabaseConnected()
  console.log("DataBase Connected Succesfully")
  var a = await knex("users").where("username", "test").first()
  console.log(a)
}

const error = trytocatch(main, "")

if (error) console.error(error)
