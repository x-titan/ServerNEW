import Router from "@koa/router"
import * as authController from "./controller"
import type { IState, IContext } from "../../core/types"

const router = new Router<IState, IContext>()

router
  .post("/login", authController.login)
  .post("/register", authController.register)

export default router
