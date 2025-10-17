import Router from "@koa/router"
import {
  authRoutes,
  healthRoutes,
  shareRoutes,
  urlsRoutes,
  visitsRoutes,
} from "../modules"
import requireAuth from "../middleware/requireAuth"
import type { State, Context } from "../core/types"
import useRouter from "../utils/useRouter"

const router = new Router<State, Context>()
const use = useRouter(router)

use("/auth", authRoutes)
use("/urls", urlsRoutes)
use("/visits", visitsRoutes)
use("/health", healthRoutes)
use("/share", shareRoutes)
// router
//   .use(
//     "/auth",
//     authRoutes.routes()
//   )
//   .use(
//     "/urls",
//     requireAuth(),
//     urlsRoutes.routes()
//   )
//   .use(
//     "/visits",
//     visitsRoutes.routes()
//   )
//   .use(
//     "/health",
//     healthRoutes.routes()
//   )
//   .use(
//     "/share",
//     shareRoutes.routes()
//   )

export default router
