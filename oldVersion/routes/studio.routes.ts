import Router from "@koa/router"
import * as studio from "../controllers/studio.controller"

const router = new Router()

router
  .get("/", studio.index)

export default router
