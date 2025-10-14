import serve from "koa-static"
import config from "./config/dotenv"
import { onDatabaseConnected } from "./config/knex"
import createServer from "./core/server"
import router from "./routes/router"
import path from "path"
import koaEjs from "koa-ejs"

async function main(argv?: string[]) {
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully")

  const app = createServer()

  koaEjs(app, {
    root: path.join(__dirname, "/views"),
    layout: "layouts/index",
    viewExt: "ejs",
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(path.join(__dirname, "../public")))
    .listen(config.server.port, () => {
      console.log(`Server is running on http://localhost:${config.server.port}`)
    })
}

main(process.argv)
  .catch((error) => console.error("Fatal error: ", error))
