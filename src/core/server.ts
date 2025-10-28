import Application from "koa"

// Middlewares
import helmet from "koa-helmet"
import cors from "@koa/cors"
import logger from "koa-logger"
import error from "@xtitan/koa-error-handler"
import body from "koa-body"

// Options
import helmetOptions from "../configs/helmet"
import koaBodyOptions from "../configs/koaBody"
import errorOptions from "../configs/error"
import corsOptions from "../configs/cors"

export default function createServer(options?: any) {
  const app = new Application()

  app
    .use(error(errorOptions))
    .use(helmet(helmetOptions))
    .use(cors(corsOptions))
    .use(logger())
    .use(body(koaBodyOptions))

  return app
}
