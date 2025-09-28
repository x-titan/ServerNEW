import Router from "@koa/router"
import auth from "./auth.router"
import urls from "./urls.router"
import visits from "./visits.router"
import health from "./health.router"
import hello from "./hello.router"
import studio from "./studio.router"
import requireAuth from "../middleware/requireAuth"

const router = new Router()

router
  .use(
    "/studio",
    studio.routes(),
    studio.allowedMethods()
  )
  .use(
    "/auth",
    auth.routes(),
    auth.allowedMethods()
  )
  .use(
    "/urls",
    requireAuth,
    urls.routes(),
    urls.allowedMethods()
  )
  .use(
    "/visits",
    visits.routes(),
    visits.allowedMethods()
  )
  .use(
    "/health",
    health.routes(),
    health.allowedMethods()
  )
  .use(
    "/hello",
    hello.routes(),
    hello.allowedMethods()
  )

export default router
