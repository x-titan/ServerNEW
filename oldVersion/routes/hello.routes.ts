import Router from "@koa/router"
import * as hello from "../controllers/hello.controller"

const router = new Router()

router
  .get("/", hello.world)

export default router
