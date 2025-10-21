import Router from "@koa/router"
import requireAuth from "../../middleware/requireAuth"
import * as urlsController from "./controller"

import type {
  IAuthState,
  IContext,
  IState,
} from "../../core/types"

const router = new Router<IAuthState, IContext>();

router
  .use(requireAuth())
  .post("/", urlsController.createShortURL)
  .post("/all", urlsController.getURLs)
  .delete("/", urlsController.deleteURL)
  .put("/", urlsController.updateURL)
  .get("/get/:id", urlsController.resolveURL)

const urlsRouter = router as Router<IState, IContext>

export default urlsRouter
