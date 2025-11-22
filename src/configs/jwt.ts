import jwt, {
  SignOptions,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken"
import httpAssert from "http-assert"
import httpError from "http-errors"
import {
  isString,
} from "@x-titan/type-is"

import config from "./dotenv"
import {
  resolveOptions,
} from "../utils"

import type {
  IJWTPayload,
  IGenerateTokenOptions,
} from "./types/jwtConfig"

const { jwtSecret, jwtExpiresIn } = config.security

export function generateToken(
  payload: Omit<IJWTPayload, "iat" | "exp">,
  options?: IGenerateTokenOptions
): string {
  httpAssert(payload.id, 500, "JWT payload must contain 'id' field")

  const signOptions: SignOptions = resolveOptions(
    {
      expiresIn: jwtExpiresIn,
      issuer: "Server",
      audience: "Client"
    } as SignOptions,
    options
  )

  return jwt.sign(
    payload,
    jwtSecret,
    signOptions
  )
}

export function validateJWT(token: string): IJWTPayload {
  try {
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: "Server",
      audience: "Client"
    })

    httpAssert(!isString(decoded), 401, "Invalid token format")
    return decoded as IJWTPayload
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

export function decodeToken(token: string): IJWTPayload | null {
  try {
    const decoded = jwt.decode(token)
    if (isString(decoded) || !decoded)
      return null
    return decoded as IJWTPayload
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
