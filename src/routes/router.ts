import Router from "@koa/router"
import useRouter from "../utils/useRouter"
import {
  authRouter,
  healthRouter,
  urlsRouter,
  visitsRouter,
} from "../modules"

import type {
  IState,
  IContext,
} from "../core/types"
import testRouter from "../modules/test/routes"

const router = new Router<IState, IContext>()
const use = useRouter(router)

use("/test", testRouter)
use("/auth", authRouter)
use("/urls", urlsRouter)
use("/visits", visitsRouter)
use("/health", healthRouter)

export default router
