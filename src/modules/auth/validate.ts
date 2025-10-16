import httpAssert from "http-assert"
import { validatePassword, validateUsername } from "../users/validate"
import { isString } from "../../utils/types"

export function validateLoginInput(body: any) {
  httpAssert(body, 400, "Request body is required")
  httpAssert(body.username, 400, "Username is required")
  httpAssert(body.password, 400, "Password is required")

  const { username, password } = body

  validateUsername(username)

  httpAssert(
    isString(password),
    400, "Password must be a string")
  httpAssert(
    password.length >= 8,
    400, "Password must be at least 8 characters")
  httpAssert(
    password.length < 100,
    400, "Password must not exceed 100 characters")
}

export function validateRegisterInput(body: any) {
  httpAssert(body, 400, "Request body is required")
  httpAssert(body.username, 400, "Username is required")
  httpAssert(body.password, 400, "Password is required")

  const { username, password } = body
  validateUsername(username)
  validatePassword(password)
}
