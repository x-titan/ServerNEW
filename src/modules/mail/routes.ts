import Router from "@koa/router"
import requireAuth from "../../middleware/requireAuth"

import type {
  IState,
  IContext,
} from "../../core/types"

const mailRouter = new Router<IState, IContext>()

mailRouter
  .use(requireAuth())

export default mailRouter
