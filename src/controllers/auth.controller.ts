import type { RouterContext } from "@koa/router"
import * as authService from "../services/auth.service"

export async function login(ctx: RouterContext) {
  const { username, password } = ctx.request.body as any
  const token = await authService.login(username, password)
  ctx.body = { token }
}

export async function register(ctx: RouterContext) {
  const { username, password } = ctx.request.body as any
  ctx.body = await authService.register(username, password)
}
