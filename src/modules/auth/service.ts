import httpAssert from "http-assert"

import {
  comparePassword,
  hashPassword,
} from "../../config/encryption"
import { generateToken } from "../../config/jwt"

import * as UsersModel from "../users/repository"
import {
  validatePassword,
  validateUsername,
} from "../users/validate"

export async function login(
  username: string,
  password: string
) {
  validateUsername(username)
  validatePassword(password)

  const user = await UsersModel.findByUsername(username)

  httpAssert(user, 404, "User not found")
  httpAssert(
    await comparePassword(password, user.password),
    401, "Invalid password"
  )

  return generateToken({ username, id: user.id })
}

export async function register(
  username: string,
  password: string
) {
  validateUsername(username)
  validatePassword(password)

  const currend_user = await UsersModel.findByUsername(username)
  httpAssert(!currend_user,
    409, `User "${username}" is already exists`)

  return UsersModel.createUser(
    username,
    await hashPassword(password)
  )
}

