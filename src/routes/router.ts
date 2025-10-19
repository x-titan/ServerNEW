import Router from "@koa/router"
import useRouter from "../utils/useRouter"
import {
  authRoutes,
  healthRoutes,
  urlsRoutes,
  visitsRoutes,
} from "../modules"
import type {
  IState,
  IContext,
} from "../core/types"

const router = new Router<IState, IContext>()
const use = useRouter(router)

use("/auth", authRoutes)
use("/urls", urlsRoutes)
use("/visits", visitsRoutes)
use("/health", healthRoutes)

export default router
