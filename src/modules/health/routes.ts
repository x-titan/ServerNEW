import Router from "@koa/router"
import * as healthController from "./controller"
import type { State, Context } from "../../core/types"

const healthRouter = new Router<State, Context>()

healthRouter
  .get("/", healthController.check)
  .head("/", healthController.checkHead)

export default healthRouter
