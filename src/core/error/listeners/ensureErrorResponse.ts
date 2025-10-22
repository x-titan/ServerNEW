import {
  isReponded,
} from "../../../utils"

import type {
  IErrorListener,
} from "../../types"

const ensureErrorResponse: IErrorListener = async (error, ctx) => {
  if (isReponded(ctx)) return

  if (!ctx.status || ctx.status === 404)
    ctx.status = error.status ?? 500

  if (!ctx.body)
    ctx.body = {
      success: false,
      message: error.message,
      error: {
        timestamp: new Date().toISOString(),
        status: error.status
      }
    }
}

export default ensureErrorResponse
