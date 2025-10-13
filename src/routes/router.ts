import Router from "@koa/router"
import auth from "./auth.routes"
import urls from "./urls.routes"
import visits from "./visits.routes"
import share from "./share.routes"
import health from "./health.routes"
import hello from "./hello.routes"
import studio from "./studio.routes"
import requireAuth from "../middleware/requireAuth"
import useRouter from "../utils/useRouter"

const router = new Router()

const use = useRouter(router)

// use("/studio", studio)
// use("/auth", auth)
// use("/urls", urls)
// use("/visits", visits)
// use("/health", health)
// use("/share", share)
// use("/hello", hello)

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
    "/share",
    share.routes(),
    share.allowedMethods()
  )
  .use(
    "/hello",
    hello.routes(),
    hello.allowedMethods()
  )

export default router
