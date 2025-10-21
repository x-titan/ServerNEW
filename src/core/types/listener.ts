import type { HttpError } from "http-errors"
import type * as Koa from "koa"
import type { IContext } from "./context"
import type { IErrorResponse } from "./response"
import type { IState } from "./state"

export type IErrorListener<
  StateT = Koa.DefaultState,
  ContextT = Koa.DefaultContext,
  BodyT = unknown
> = (
  error: HttpError,
  ctx: Koa.ParameterizedContext<
    StateT & IState,
    ContextT & IContext & { body?: IErrorResponse },
    BodyT
  >
) => void | Promise<void>
