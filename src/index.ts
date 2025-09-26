import "dotenv/config"
import knex, { onDatabaseConnected } from "./config/knex"
import Koa from "koa"
import cors from "@koa/cors"
import helmet from "koa-helmet"
import bodyParser from "koa-bodyparser"
import router from "./routes/router"
import serve from "koa-static"
import logger from "koa-logger"
import path from "path"

const app = new Koa()
const PORT = process.env.PORT || 3000

app
  .use(logger())
  .use(cors())
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://x-titan.github.io"],
      },
    },
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(
    path.join(__dirname, "../public")
  ))

async function main(args?: string[]) {
  await onDatabaseConnected()
  console.log("DataBase Connected Successfully")
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}

main()
  .catch((err) => console.error("Fatal error: ", err))
