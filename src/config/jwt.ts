import jwt, {
  SignOptions,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken"
import httpError from "http-errors"
import config from "./dotenv"
import httpAssert from "http-assert"
import { opts } from "../utils/default"
import { isObject, isString } from "../utils/types"

const { jwtSecret, jwtExpiresIn } = config.security

export interface JWTPayload {
  id: number
  username: string
  iat?: number
  exp?: number
}

export interface GenerateTokenOptions {
  expiresIn?: string | number
  audience?: string
  issuer?: string
}

export function generateToken(
  payload: Omit<JWTPayload, "iat" | "exp">,
  options?: GenerateTokenOptions
): string {
  httpAssert(payload.id, 500, "JWT payload must contain 'id' field")

  const signOptions: SignOptions = opts(options, {
    expiresIn: jwtExpiresIn,
    issuer: "url-shortener-api",
    audience: "url-shortener-client"
  })

  return jwt.sign(
    payload,
    jwtSecret,
    signOptions
  )
}

export function validateJWT(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: "url-shortener-api",
      audience: "url-shortener-client"
    })

    httpAssert(!isString(decoded), 401, "Invalid token format")
    return decoded as JWTPayload
  } catch (error) {
    if (error instanceof TokenExpiredError)
      throw new httpError.Unauthorized("Token has expired")

    if (error instanceof JsonWebTokenError) {
      httpAssert(
        error.message.includes("Invalid token signature"),
        401, "Invalid token signature")
      httpAssert(
        error.message.includes("jwt malformed"),
        401, "Malformed token")
      httpAssert(
        error.message.includes("Invalid token algorithm"),
        401, "Invalid token")
    }

    throw new httpError.Unauthorized("Token validation failed")
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.decode(token)
    if (isString(decoded) || !decoded)
      return null
    return decoded as JWTPayload
  } catch (error) {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp)
    return true
  return decoded.exp * 1000 < Date.now()
}

export function getTokenExpiresIn(token: string): number | null {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp)
    return null

  const expiresAt = decoded.exp * 1000
  const now = Date.now()
  const secondsLeft = Math.floor((expiresAt - now) / 1000)
  return (secondsLeft > 0) ? secondsLeft : 0
}

export function refreshToken(oldToken: string): string {
  const payload = validateJWT(oldToken)
  const { iat, exp, ...cleanPayload } = payload
  return generateToken(cleanPayload)
}
