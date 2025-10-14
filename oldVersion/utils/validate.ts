import { isString } from "xtitan-typeis"
import httpAssert from "http-assert"

export function validateUsername(username: string): asserts username {
  httpAssert(
    isString(username) && /^[a-zA-Z0-9_]{3,30}$/.test(username),
    400, "Username must be 3-30 characters long and can only contain letters, numbers, and underscores")
}

export function validatePassword(password: string): asserts password {
  httpAssert(
    isString(password) && /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password),
    400, "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character")
}

export function validateUrl(url: string): asserts url {
  httpAssert(
    /^https?:\/\/.+$/.test(url),
    400, "URL must start with http:// or https://"
  )
}
