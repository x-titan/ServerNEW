import type * as Koa from "koa"
import type { IJSONResponse } from "./response"

export interface IContext extends Koa.Context {
  body: IJSONResponse
}
