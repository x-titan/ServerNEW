import httpAssert from "http-assert"
import createHttpError, { HttpError } from "http-errors"

import ensureErrorResponse from "./listeners/ensureErrorResponse"
import toHttpError from "./toHttpError"

import {
  resolveOptions,
  isFunction,
  canSendResponse,
} from "../../utils"

import type {
  IMiddleware,
  IErrorListener,
  IContext,
} from "../types"

export interface IErrorHandlerOptions {
  onHttpError: IErrorListener
}

const errorOptions: IErrorHandlerOptions = {
  onHttpError: ensureErrorResponse
}

const safeInvokeHook = async (hook: IErrorListener, httpError: HttpError, ctx: IContext) => {
  try {
    await hook(httpError, ctx as any)
  } catch (hookErr) {
    console.error("[onHttpError failed]", hookErr)
  }
}

const throwNotFound = (ctx: IContext) => {
  if (canSendResponse(ctx))
    throw createHttpError(
      404,
      `Route ${ctx.method} ${ctx.path} not found`
    )
}

export default function createErrorHandler(options?: IErrorHandlerOptions): IMiddleware {
  const { onHttpError } = resolveOptions(errorOptions, options)

  httpAssert(isFunction(onHttpError),
    500, "onHttpError must be a function")

  return async function errorHandler(ctx, next) {
    try {
      await next()
      throwNotFound(ctx)
    } catch (err) {
      const httpError = toHttpError(err)

      await safeInvokeHook(
        onHttpError,
        httpError, ctx as any
      )

      await safeInvokeHook(
        ensureErrorResponse,
        httpError, ctx as any
      )

      ctx.app.emit("error", httpError, ctx)
    }
  }
}
