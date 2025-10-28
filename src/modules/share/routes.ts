import Router from "@koa/router"
import * as shareController from "./controller"

import type {
  IState,
  IContext,
} from "../../core/types"

const router = new Router<IState, IContext>()

router
  .get("/", shareController.index)
  .post("/upload", shareController.upload)
  .post("/download", shareController.download)

export default router
