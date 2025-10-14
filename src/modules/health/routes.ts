import Router from "@koa/router"
import * as healthController from "./controller"

const healthRouter = new Router()

healthRouter
  .get("/", healthController.check)
  .head("/", healthController.checkHead)

export default healthRouter
