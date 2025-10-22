import type * as Koa from "koa"
import type * as Router from "@koa/router"

import type {
  IState,
  IAuthState,
} from "./state"
import type {
  IContext,
} from "./context"
import type { IJSONResponse } from "./response"

export type IMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown
> = Koa.Middleware<
  StateT & IState,
  ContextT & IContext,
  BodyT
>

export type IRouterMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown
> = Router.Middleware<
  StateT & IState,
  ContextT & IContext,
  BodyT
>

export type IAuthMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown
> = IMiddleware<
  StateT & IAuthState,
  ContextT,
  BodyT
>
