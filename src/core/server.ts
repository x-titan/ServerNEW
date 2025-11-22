import Application from "koa"

// Middlewares
import helmet from "koa-helmet"
import cors from "@koa/cors"
import logger from "koa-logger"
import body from "koa-body"
import serve from "koa-static"
import error from "@x-titan/koa-error-handler"

// Options
import errorOptions from "../configs/error"
import helmetOptions from "../configs/helmet"
import corsOptions from "../configs/cors"
import koaBodyOptions from "../configs/koaBody"
import staticOptions from "../configs/static"

export default function createServer(options?: any) {
  const app = new Application()

  app
    .use(error(errorOptions))
    .use(helmet(helmetOptions))
    .use(cors(corsOptions))
    .use(logger())
    .use(body(koaBodyOptions))
    .use(serve(
      staticOptions.root,
      staticOptions.options
    ))

  return app
}
