import path from "path"
import koaEjs from "koa-ejs"

import createServer from "./core/server"
import setupGracefulShutdown from "./core/shutdown"
import router from "./routes/router"

import config from "./configs/dotenv"
import { onDatabaseConnected } from "./configs/knex"

let once = false

export default async function main(argv?: string[]) {
  if (once) {
    console.log("Main function already called.")
    return
  }

  once = true
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully.")

  const app = createServer()

  koaEjs(app, {
    root: path.join(__dirname, "/views"),
    layout: "layouts/index",
    viewExt: "ejs",
    cache: config.isProduction,
    debug: false,
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())

  const server = app.listen(config.server.port, onListen)
  setupGracefulShutdown(server)
}

function onListen() {
  console.log(`Server is running on http://localhost:${config.server.port}`)
  console.log("Environment: " + config.env)
  console.log("-".repeat(50))
}

if (require.main === module)
  main(process.argv)
    .catch((error) => {
      console.error("Fatal error: ", error)
      process.exit(1)
    })
