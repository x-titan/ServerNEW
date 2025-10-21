import Router from "@koa/router"
import * as authController from "./controller"

import type {
  IState,
  IContext,
} from "../../core/types"

const authRouter = new Router<IState, IContext>()

authRouter
  .post("/login", authController.login)
  .post("/register", authController.register)

export default authRouter
