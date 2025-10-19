import {
  LoginSchema,
  RegisterSchema,
  type ILoginUser,
  type IRegisterUser,
  type ILoginAuthResponse,
  type IPublicAuthResponse,
} from "./model"

import * as authService from "./service"
import { createSafeObject } from "../../utils"

import type {
  IMiddleware,
} from "../../core/types"

export const login: IMiddleware = async (ctx) => {
  const body = createSafeObject(ctx.request.body)
  LoginSchema.parse(body)

  const { username, password } = body as ILoginUser
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
