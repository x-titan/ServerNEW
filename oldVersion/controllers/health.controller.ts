import type { RouterContext, Middleware } from "@koa/router"
import * as healthService from "../services/health.service"

export const check: Middleware = async (ctx: RouterContext) => {
  ctx.body = await healthService.checkDatabaseConnection()
  ctx.status = await healthService.checkDatabaseHealth()
}

export const checkHead: Middleware = async (ctx: RouterContext) => {
  ctx.status = await healthService.checkDatabaseHealth()
}
