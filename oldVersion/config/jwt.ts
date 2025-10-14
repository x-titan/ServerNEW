import jwt, { SignOptions } from "jsonwebtoken"
import httpError from "http-errors"
import config from "./dotenv"

const { jwtSecret, jwtExpiresIn } = config.security

export function generateToken(payload: { [key: string]: any }) {
  return jwt.sign(
    payload,
    jwtSecret,
    {
      expiresIn: jwtExpiresIn
    } as SignOptions
  )
}

export function validateJWT(token: string) {
  try {
    return jwt.verify(token, jwtSecret) as { [key: string]: any }
  } catch (error) {
    throw new httpError.Unauthorized("Invalid token")
  }
}
