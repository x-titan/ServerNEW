import Router from "@koa/router"
import * as controller from "./controller"

const router = new Router()

router
  .get("/", controller.index)
  .post("/upload", controller.upload)
  .post("/download", controller.download)

export default router
