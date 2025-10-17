import Router from "@koa/router"
import * as healthController from "./controller"
import type { State, Context } from "../../core/types"

const healthRouter = new Router<State, Context>()

healthRouter
  .post("/", healthController.check)

export default healthRouter
