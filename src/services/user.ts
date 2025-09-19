import httpAssert from "http-assert"
import knex from "../config/knex"
import { hashPassword } from "../config/encryption"

export async function register(body: {
  username: string,
  password: string
}) {
  httpAssert(validateUsername(body.username), 400,
    "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")
  httpAssert(validatePassword(body.password), 400,
    "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")

  const currend_user = await knex("users")
    .whereRaw(`LOWER(username) = LOWER(?)`, [body.username])
    .first()

  httpAssert(!currend_user, 409, `User "${body.username}" is already exists`)
  const results = await knex("users")
    .insert({
      username: body.username.toLowerCase(),
      password: await hashPassword(body.password),
    }, ["username", "id"])
  return results[0]
}

export async function login(body: {
  username: string,
  password: string
}) {

}

export function validateUsername(username: string) {
  return /^[a-zA-Z0-9_]{3,30}$/.test(username)
}

export function validatePassword(password: string) {
  return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password)
}
