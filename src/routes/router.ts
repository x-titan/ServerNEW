import Router from "@koa/router"
import {
  authRoutes,
  healthRoutes,
  shareRoutes,
  urlsRoutes,
  visitsRoutes,
} from "../modules"
import requireAuth from "../middleware/requireAuth"
import type { State, Context, Middleware } from "../core/types"

const router = new Router<State, Context>()

router
  .use(
    "/auth",
    authRoutes.routes(),
    authRoutes.allowedMethods()
  )
  .use(
    "/urls",
    requireAuth(),
    urlsRoutes.routes(),
    urlsRoutes.allowedMethods()
  )
  .use(
    "/visits",
    visitsRoutes.routes(),
    visitsRoutes.allowedMethods()
  )
  .use(
    "/health",
    healthRoutes.routes(),
    healthRoutes.allowedMethods()
  )
  .use(
    "/share",
    shareRoutes.routes(),
    shareRoutes.allowedMethods()
  )

export default router
