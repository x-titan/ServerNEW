import z from "zod"

import {
  UserSchema,
  type IPublicUser,
} from "../users/model"
import type {
  IJSONResponse,
} from "../../core/types"

export const LoginSchema = UserSchema.pick({
  username: true,
  password: true,
})

export const RegisterSchema = LoginSchema.extend({
  password: LoginSchema.shape.password.regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/]).{8,}$/,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character"
  )
})

export type ILoginUser = z.infer<typeof LoginSchema>

export type IRegisterUser = z.infer<typeof RegisterSchema>

//  RESPONSE

export interface ILoginAuthResponse extends IJSONResponse {
  token: string
}

export interface IPublicAuthResponse extends IJSONResponse {
  data: IPublicUser
}
