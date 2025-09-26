import Router from "@koa/router"
import * as authController from "../controllers/auth.controller"

const router = new Router()

router
  .post("/login", authController.login)
  .post("/register", authController.register)

export default router
