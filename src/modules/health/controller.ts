import * as healthService from "./service"
import type { IMiddleware } from "../../core/types"

export const check: IMiddleware = async (ctx) => {
  const response = {
    success: true,
    data: await healthService.checkDatabaseConnection(),
  }

  ctx.body = response
}
