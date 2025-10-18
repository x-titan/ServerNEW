import Router from "@koa/router"
import * as visitsController from "./controller"
import type { IState, IContext } from "../../core/types"

const router = new Router<IState, IContext>()

export default router