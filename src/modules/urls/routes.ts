import Router from "@koa/router"
import requireAuth from "../../middleware/requireAuth"
import * as urlsController from "./controller"
import type { IAuthMiddleware, IAuthState, IContext, IMiddleware, IState } from "../../core/types"

const router = new Router<IAuthState, IContext>()

router
  .use(requireAuth())
  .post("/", urlsController.createShortURL)
  .post("/all", urlsController.getURLs)
  .delete("/", urlsController.deleteURL)
  .put("/", urlsController.updateURL)
  .get("/get/:id", urlsController.resolveURL)

const urlsRoutes = router as Router<IState, IContext>

export default urlsRoutes
