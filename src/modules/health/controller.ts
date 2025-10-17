import * as healthService from "./service"
import type { Middleware } from "../../core/types"

export const check: Middleware = async (ctx) => {
  const response = {
    status: "pass",
    databaseStatus: await healthService.checkDatabaseConnection(),
  }

  ctx.body = response
}
