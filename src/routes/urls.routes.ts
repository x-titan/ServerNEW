import Router from "@koa/router"
import * as urls from "../controllers/urls.controller"

const router = new Router()

router
  .post("/", urls.createShortURL)
  .post("/shorter", urls.createShortURL)
  .get("/get/:code", urls.resolveURL)
  .post("/all", urls.getURLS)

export default router
