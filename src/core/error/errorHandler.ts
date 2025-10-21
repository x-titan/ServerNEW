import httpAssert from "http-assert"
import createHttpError from "http-errors"

import sendError from "./listeners/sendError"
import toHttpError from "./toHttpError"

import {
  mergeOptions,
  isFunction,
} from "../../utils"

import type {
  IMiddleware,
  IErrorListener,
} from "../types"

export interface IErrorHandlerOptions {
  onHttpError: IErrorListener
}

const errorOptions: IErrorHandlerOptions = {
  onHttpError: sendError
}

export default function craeteErrorHandler(options?: IErrorHandlerOptions): IMiddleware {
  const {
    onHttpError,
  } = mergeOptions(options, errorOptions)

  httpAssert(isFunction(onHttpError),
    500, "onHttpError must be a function")

  return async function errorHandler(ctx, next) {
    try {
      await next()

      if ((!ctx.status || ctx.status === 404) && !ctx.body)
        throw createHttpError(404, `Route ${ctx.method} ${ctx.path} not found`)

    } catch (error) {
      const httpError = toHttpError(error)

      try {
        await onHttpError(httpError, ctx as any)
      } catch (hookError) {
        console.error("[onHttpError failed]", hookError)
      }

      if (!ctx.body)
        sendError(httpError, ctx as any)
      ctx.app.emit("error", httpError, ctx)
    }
  }
}
