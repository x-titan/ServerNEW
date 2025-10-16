import type * as Koa from "koa"
import type {
  Middleware as RouterMiddleware,
} from "@koa/router"
import type { Files } from "formidable"

// STATE type
export interface ServerState extends Koa.DefaultState{
  user?: {
    id: number
  }
}

export interface AuthState extends ServerState {
  user: {
    id: number
  }
}

// CONTEXT type

export interface ServerContext extends Koa.Context {

}

// extends REQUEST for koa-body
declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body?: any;
    files?: Files;
  }
}

export type Middleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = RouterMiddleware<
    StateT & ServerState, ContextT & ServerContext, BodyT
  >

export type AuthMiddleware<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown> = Middleware<
    StateT & AuthState, ContextT, BodyT
  >
