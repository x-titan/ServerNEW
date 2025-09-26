import httpAssert from "http-assert"
import knex from "../config/knex"
import { comparePassword, hashPassword } from "../config/encryption"
import { generateToken } from "../config/jwt"
import { isString } from "xtitan-typeis"

async function getUser(username: string) {
  return knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [username])
    .first()
}

export async function login(body: {
  username: string,
  password: string
}) {
  httpAssert(validateUsername(body.username), 400,
    "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")

  httpAssert(validatePassword(body.password), 400,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")

  const user = await getUser(body.username)

  httpAssert(user, 404, "User not found")
  httpAssert(
    await comparePassword(body.password, user.password),
    401, "Invalid password"
  )
  const token = await generateToken({ id: user.id })

  return {
    user: {
      id: user.id,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    token,
  }
}

export async function register(body: {
  username: string,
  password: string
}) {
  httpAssert(validateUsername(body.username), 400,
    "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")
  httpAssert(validatePassword(body.password), 400,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")

  const currend_user = await getUser(body.username)

  httpAssert(!currend_user, 409, `User "${body.username}" is already exists`)
  const results = await knex("users")
    .insert({
      username: body.username.toLowerCase(),
      password: await hashPassword(body.password),
    }, ["username", "id"])
  return results[0]
}

export function validateUsername(username: string) {
  return isString(username) && /^[a-zA-Z0-9_]{3,30}$/.test(username)
}

export function validatePassword(password: string) {
  return isString(password) && /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password)
}
