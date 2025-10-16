import Router from "@koa/router"
import * as authController from "./controller"
import type { State, Context } from "../../core/types"

const router = new Router<State, Context>()

router
  .post("/login", authController.login)
  .post("/register", authController.register)

export default router
