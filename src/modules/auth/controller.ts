import * as authService from "./service"
import { validateLoginInput, validateRegisterInput } from "./validate"
import type { IMiddleware } from "../../core/types"
import type { IAuthUserRequest, ILoginAuthResponse, IPublicAuthResponse } from "./types"

export const login: IMiddleware = async (ctx) => {
  const body = ctx.request.body
  validateLoginInput(body)

  const { username, password } = body as IAuthUserRequest
  const token = await authService.login(username, password)

  ctx.status = 200
  ctx.body = {
    success: true,
    token,
    message: "Login successful",
  } as ILoginAuthResponse
}

export const register: IMiddleware = async (ctx) => {
  const body = ctx.request.body
  validateRegisterInput(body)

  const { username, password } = body as IAuthUserRequest
  const result = await authService.register(username, password)

  ctx.status = 201
  ctx.body = {
    success: true,
    data: result,
    message: "Registration successful"
  } as IPublicAuthResponse
}
