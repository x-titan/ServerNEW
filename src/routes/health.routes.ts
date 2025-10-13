import Router from "@koa/router"
import * as health from "../controllers/health.controller"

const healthRouter = new Router()

healthRouter
  .get("/", health.check)
  .head("/", health.checkHead)

export default healthRouter
