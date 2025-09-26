import Router from "@koa/router"
import * as urlsController from "../controllers/urls.controller"

const router = new Router()

router
  .post("/", urlsController.createShortURL)
  .post("/shorter", urlsController.createShortURL)
  .get("/get/:code", urlsController.resolveURL)
  .post("/all", urlsController.getURLS)

export default router
