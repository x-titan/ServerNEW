import type * as Koa from "koa"
import type {
  Middleware as RouterMiddleware,
} from "@koa/router"
import type { State,AuthState } from "./state"
import type { Context } from "./context"

export type Middleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = RouterMiddleware<
    StateT & State, ContextT & Context, BodyT
  >

export type AuthMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = Middleware<
    StateT & AuthState, ContextT, BodyT
  >
