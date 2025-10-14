import Router from "@koa/router"
import * as share from "../controllers/share.controller"

const router = new Router()

router
  .get("/", share.index)
  .post("/upload", share.upload)
  .post("/download", share.download)

export default router
