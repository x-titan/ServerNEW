import Router from "@koa/router"
import authRouter from "./auth.route"
import urlsRouter from "./urls.route"
import visitsRouter from "./visits.route"
import healthRouter from "./health.route"
import requireAuthHandler from "../middlewares/requireAuthHandler"

const router = new Router()

router
  .use(
    "/auth",
    authRouter.routes(),
    authRouter.allowedMethods()
  )
  .use(
    "/urls",
    requireAuthHandler,
    urlsRouter.routes(),
    urlsRouter.allowedMethods()
  )
  .use(
    "/visits",
    visitsRouter.routes(),
    visitsRouter.allowedMethods()
  )
  .use(
    "/health",
    healthRouter.routes(),
    healthRouter.allowedMethods()
  )

export default router
