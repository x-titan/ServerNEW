import type { Middleware } from "../../core/types"
import * as healthService from "./service"

export const check: Middleware = async (ctx) => {
  ctx.body = await healthService.checkDatabaseConnection()
  ctx.status = await healthService.checkDatabaseHealth()
}

export const checkHead: Middleware = async (ctx) => {
  ctx.status = await healthService.checkDatabaseHealth()
}
