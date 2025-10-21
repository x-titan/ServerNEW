import {
  LoginSchema,
  RegisterSchema,
  type ILoginUser,
  type IRegisterUser,
  type ILoginAuthResponse,
  type IPublicAuthResponse,
} from "./model"

import * as authService from "./service"
import { safeObject } from "../../utils"

import type {
  IRouterMiddleware,
} from "../../core/types"

export const login: IRouterMiddleware = async (ctx) => {
  const body = safeObject(ctx.request.body)
  LoginSchema.parse(body)

  const { username, password } = body as ILoginUser
  const token = await authService.login(username, password)

  // ctx.status = 200
  ctx.body = {
    success: true,
    token,
    message: "Login successful",
  } as ILoginAuthResponse
}

export const register: IRouterMiddleware = async (ctx) => {
  const body = ctx.request.body
  RegisterSchema.parse(body)

  const { username, password } = body as IRegisterUser
  const result = await authService.register(username, password)

  ctx.status = 201
  ctx.body = {
    success: true,
    data: result,
    message: "Registration successful"
  } as IPublicAuthResponse
}
