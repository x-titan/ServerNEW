import Router from "@koa/router"
import * as auth from "../controllers/auth.controller"

const router = new Router()

router
  .post("/login", auth.login)
  .post("/register", auth.register)

export default router
