import Router from "@koa/router"
import index from "./index.routes"
import auth from "./auth.routes"
import urls from "./urls.routes"
import visits from "./visits.routes"
import share from "./share.routes"
import health from "./health.routes"
import hello from "./hello.routes"
import studio from "./studio.routes"
import requireAuth from "../middleware/requireAuth"

const router = new Router()

router
  .get(
    "/", async (ctx) => {
      await ctx.render("index", { title: "a" })
    }
  )
  .use(
    "/hello",
    hello.routes(),
    hello.allowedMethods()
  )
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

export default router
