import { ZodError } from "zod"

import createHttpError, {
  isHttpError,
  type HttpError,
} from "http-errors"
import type { IContext } from "../types"

export default function toHttpError(error: any, ctx?: IContext): HttpError {
  if (isHttpError(error)) return error
  console.log("cacth by toHttpError", error?.message)

  const status = error instanceof ZodError ? 400 : 500
  const message = error instanceof Error ? error.message : "Internal server error"
  const cause = error instanceof Error ? error : undefined

  return cause ? createHttpError(status, message, { cause }) : createHttpError(status, message)
}

// export function toHttpError2(error: unknown, ctx?: IContext): HttpError {
//   var httpError: HttpError

//   if (isHttpError(error))
//     httpError = error
//   else if (error instanceof ZodError)
//     httpError = createHttpError(400, error.message, { cause: error })
//   else if (error instanceof Error)
//     httpError = createHttpError(500, error.message, { cause: error })
//   else
//     httpError = createHttpError(500, "Internal server error")

//   return httpError
// }
