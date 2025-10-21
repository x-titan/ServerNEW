import { ZodError } from "zod"

import createHttpError, {
  isHttpError,
  type HttpError,
} from "http-errors"
import type { IContext } from "../types"

export default function toHttpError(error: unknown, ctx?: IContext): HttpError {
  var httpError: HttpError

  if (isHttpError(error))
    httpError = error
  else if (error instanceof ZodError)
    httpError = createHttpError(400, error.message, { cause: error })
  else if (error instanceof Error)
    httpError = createHttpError(500, error.message, { cause: error })
  else
    httpError = createHttpError(500, "Internal server error")

  return httpError
}
