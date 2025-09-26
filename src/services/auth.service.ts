import httpAssert from "http-assert"
import knex from "../config/knex"
import { comparePassword, hashPassword } from "../config/encryption"
import { generateToken } from "../config/jwt"
import { isString } from "xtitan-typeis"
import * as UserModel from "../models/user.model"

export async function login(
  username: string,
  password: string
) {
  httpAssert(validateUsername(username), 400,
    "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")

  httpAssert(validatePassword(password), 400,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")

  const user = await UserModel.findByUsername(username)

  httpAssert(user, 404, "User not found")
  httpAssert(
    await comparePassword(password, user.password),
    401, "Invalid password"
  )

  return generateToken({ id: user.id })
}

export async function register(
  username: string,
  password: string
) {
  httpAssert(validateUsername(username), 400,
    "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")
  httpAssert(validatePassword(password), 400,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")

  const currend_user = await UserModel.findByUsername(username)
  httpAssert(!currend_user, 409, `User "${username}" is already exists`)

  return UserModel.createUser(username, await hashPassword(password))
}

export function validateUsername(username: string) {
  return isString(username) && /^[a-zA-Z0-9_]{3,30}$/.test(username)
}

export function validatePassword(password: string) {
  return isString(password) && /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password)
}
