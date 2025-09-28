import "dotenv/config"
import { onDatabaseConnected } from "./config/knex"
import app from "./app"

const { PORT = 3000 } = process.env

async function main(argv?: string[]) {
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully")

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

main(process.argv)
  .catch((error) => console.error("Fatal error: ", error))
