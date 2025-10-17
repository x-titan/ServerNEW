import serve from "koa-static"
import config from "./config/dotenv"
import { onDatabaseConnected } from "./config/knex"
import createServer from "./core/server"
import router from "./routes/router"
import path from "path"
import koaEjs from "koa-ejs"
import setupGracefulShutdown from "./core/shutdown"

async function main(argv?: string[]) {
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully")

  const app = createServer()

  koaEjs(app, {
    root: path.join(__dirname, "/views"),
    layout: "layouts/index",
    viewExt: "ejs",
    cache: config.isProduction,
    // debug: config.isDevelopment,
  })

  app
    .use(serve(path.join(__dirname, "../public")))
    .use(router.routes())
    .use(router.allowedMethods())

  const server = app.listen(config.server.port, () => {
    console.log(`Server is running on http://localhost:${config.server.port}`)
    console.log("Environment: " + config.env)
  })

  setupGracefulShutdown(server)
}

if (require.main === module)
  main(process.argv)
    .catch((error) => {
      console.error("Fatal error: ", error)
      process.exit(1)
    })

export default main
