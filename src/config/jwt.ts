import jwt, { SignOptions } from "jsonwebtoken"
import httpAssert from "http-assert"
import httpError from "http-errors"

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "365d"

export function generateToken(payload: { [key: string]: any }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as SignOptions)
}

export function validateJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { [key: string]: any }
  } catch (error) {
    throw new httpError.Unauthorized("Invalid token")
  }
}
