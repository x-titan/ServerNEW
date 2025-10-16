import Router from "@koa/router"
import * as urlsController from "./controller"
import type { AuthState, Context, State } from "../../core/types"

const router = new Router<AuthState, Context>()

router
  .post("/", urlsController.createShortURL)
  .post("/shorter", urlsController.createShortURL)
  .get("/get/:code", urlsController.resolveURL)
  .post("/all", urlsController.getURLS)

const urlsRoutes = router as Router<State, Context>

export default urlsRoutes
