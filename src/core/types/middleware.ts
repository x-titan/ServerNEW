import type * as Koa from "koa"
import type {
  Middleware as RouterMiddleware,
} from "@koa/router"
import type { IState,IAuthState } from "./state"
import type { IContext } from "./context"

export type IMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = RouterMiddleware<
    StateT & IState, ContextT & IContext, BodyT
  >

export type IAuthMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = IMiddleware<
    StateT & IAuthState, ContextT, BodyT
  >
