import Router from "@koa/router"
import * as visitsController from "./controller"
import type { State, Context } from "../../core/types"

const router = new Router<State, Context>()

export default router