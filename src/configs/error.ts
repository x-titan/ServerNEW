import config from "./dotenv"
import toHttpError from "../utils/error/toHttpError"

import type { HttpError } from "http-errors"
import type {
  ErrorHandlerOptions,
  ErrorResponse,
} from "@xtitan/koa-error-handler"

const errorOptions: ErrorHandlerOptions = {
  debug: config.isDevelopment,
  prepare: toHttpError,
  formatter(response: ErrorResponse<HttpError>) {
    const error = response.error

    response.status = error.status ?? 500
    response.type = "application/json"
    response.body = {
      success: false,
      message: error.expose ? error.message : "Internal server error",
      timestamp: new Date().toISOString(),
    }
  }
}

export default errorOptions
