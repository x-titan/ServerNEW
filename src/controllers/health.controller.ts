import type { RouterContext } from "@koa/router"
import * as healthService from "../services/health.service"

export async function healthCheck(ctx: RouterContext) {
  ctx.body = await healthService.checkDatabaseConnection()
  ctx.status = await healthService.checkDatabaseHealth()
}

export async function healthHead(ctx: RouterContext) {
  ctx.status = await healthService.checkDatabaseHealth()
} 
