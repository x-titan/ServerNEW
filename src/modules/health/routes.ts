import Router from "@koa/router"
import * as healthController from "./controller"
import type {
  IState,
  IContext,
} from "../../core/types"

const healthRouter = new Router<IState, IContext>()

healthRouter
  .get("/", healthController.check)
  .post("/", healthController.check)

export default healthRouter
