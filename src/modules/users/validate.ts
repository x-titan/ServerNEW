import httpAssert from "http-assert"
import { isString } from "../../utils"

const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,100}$/

export function validateUsername(username: string): asserts username {
  httpAssert(
    isString(username),
    400, "Username must be a string")
  httpAssert(
    username.length >= 3,
    400, "Username must be at least 3 characters")
  httpAssert(
    username.length <= 30,
    400, "Username must not exceed 30 characters")
  httpAssert(
    usernameRegex.test(username),
    400, "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")
}

export function validatePassword(password: string): asserts password {
  httpAssert(
    isString(password),
    400, "Password must be a string")
  httpAssert(
    password.length >= 8,
    400, "Password must be at least 8 characters")
  httpAssert(
    password.length < 100,
    400, "Password must not exceed 100 characters")
  httpAssert(
    passwordRegex.test(password),
    400, "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")
}

validateUsername.regex = usernameRegex
validatePassword.regex = passwordRegex
