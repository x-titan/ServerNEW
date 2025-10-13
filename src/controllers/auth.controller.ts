import type { RouterContext, Middleware } from "@koa/router"
import * as authService from "../services/auth.service"
// import type { Middleware } from "koa"

export const login: Middleware = async (ctx: RouterContext) => {
  const { username, password } = ctx.request.body as any
  const token = await authService.login(username, password)
  ctx.body = { token }
}

export const register: Middleware = async (ctx: RouterContext) => {
  const { username, password } = ctx.request.body as any
  ctx.body = await authService.register(username, password)
}
