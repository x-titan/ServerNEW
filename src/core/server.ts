import Koa from "koa"
import cors from "@koa/cors"
import helmet from "koa-helmet"
import logger from "koa-logger"
import koaBody from "koa-body"

import helmetConfig from "../config/helmet"
import koaBodyConfig from "../config/koaBody"
import craeteErrorHandler, {
  loggerError,
} from "./error"

export default function createServer(options?: any) {
  const app = new Koa()

  app
    .use(craeteErrorHandler())
    .use(helmet(helmetConfig))
    .use(cors())
    .use(logger())
    .use(koaBody(koaBodyConfig))
    .on("error", loggerError)

  return app
}
