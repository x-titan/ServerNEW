import Router from "@koa/router"
import * as healthController from "../controllers/health.controller"

const healthRouter = new Router()

healthRouter
  .get("/", healthController.healthCheck)
  .head("/", healthController.healthHead)

export default healthRouter
