import Router from "@koa/router"
import requireAuth from "../../middleware/requireAuth"
import * as urlsController from "./controller"
import type { AuthState, Context, State } from "../../core/types"

const router = new Router<AuthState, Context>()

router
  .use(requireAuth())
  .post("/", urlsController.createShortURL)
  .post("/shorter", urlsController.createShortURL)
  .post("/all", urlsController.getUrlList)
  .del("/", urlsController.deleteURL)
  .put("/",urlsController.updateURL)
  .get("/get/:id", urlsController.resolveURL)

const urlsRoutes = router as Router<State, Context>

export default urlsRoutes
