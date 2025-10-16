import Router from "@koa/router"
import * as controller from "./controller"
import type { State, Context } from "../../core/types"

const router = new Router<State, Context>()

router
  .get("/", controller.index)
  .post("/upload", controller.upload)
  .post("/download", controller.download)

export default router
