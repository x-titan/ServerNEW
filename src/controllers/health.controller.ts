import type { RouterContext } from "@koa/router"

export async function healthCheck(ctx: RouterContext) {
  ctx.body = { status: "ok" }
}

export async function healthHead(ctx: RouterContext) {
  ctx.status = 200
} 
