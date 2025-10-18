import Router from "@koa/router"
import * as controller from "./controller"
import type { IState, IContext } from "../../core/types"

const router = new Router<IState, IContext>()

router
  .get("/", controller.index)
  .post("/upload", controller.upload)
  .post("/download", controller.download)

export default router
