import type { RouterContext, Middleware } from "@koa/router"
import * as authService from "./service"
import { validateLoginInput, validateRegisterInput } from "./validate"
import { AuthUser } from "../../types/user"

export const login: Middleware = async (ctx: RouterContext) => {
  const body = ctx.request.body
  validateLoginInput(body)

  const { username, password } = body as AuthUser
  const token = await authService.login(username, password)

  ctx.status = 200
  ctx.body = {
    success: true,
    token,
    message: "Login successful",
  }
}

export const register: Middleware = async (ctx: RouterContext) => {
  const body = ctx.request.body
  validateRegisterInput(body)

  const { username, password } = body as AuthUser
  const result = await authService.register(username, password)

  ctx.status = 201
  ctx.body = {
    success: true,
    ...result,
    message: "Registration successful"
  }
}
