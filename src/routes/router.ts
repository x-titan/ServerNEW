import Router from "@koa/router"
import authRouter from "./auth.router"
import urlsRouter from "./urls.router"
import visitsRouter from "./visits.router"
import healthRouter from "./health.router"
import requireAuth from "../middleware/requireAuth"

const router = new Router()

router
  .use(
    "/auth",
    authRouter.routes(),
    authRouter.allowedMethods()
  )
  .use(
    "/urls",
    requireAuth,
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
