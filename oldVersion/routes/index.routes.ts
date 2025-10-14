import Router from "@koa/router"
import * as index from "../controllers/index.controller"

const router = new Router()

router
  .get("/", index.index)

export default router
