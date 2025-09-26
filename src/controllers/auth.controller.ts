import type { RouterContext } from "@koa/router"
import * as authService from "../services/auth.service"

export async function login(ctx: RouterContext) {
  ctx.body = await authService.login(ctx.request.body as any)
}

export async function register(ctx: RouterContext) {
  ctx.body = await authService.register(ctx.request.body as any)
}
