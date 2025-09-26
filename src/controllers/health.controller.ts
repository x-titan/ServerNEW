import type { RouterContext } from "@koa/router"
import { onDatabaseConnected } from "../config/knex"

export async function healthCheck(ctx: RouterContext) {
  ctx.body = await onDatabaseConnected() ? { status: "ok" } : { status: "error" }
}

export async function healthHead(ctx: RouterContext) {
  ctx.status = await onDatabaseConnected() ? 200 : 500
} 
