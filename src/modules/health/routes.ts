import Router from "@koa/router"
import * as healthController from "./controller"
import type { IState, IContext } from "../../core/types"

const healthRouter = new Router<IState, IContext>()

healthRouter
  .post("/", healthController.check)

export default healthRouter
