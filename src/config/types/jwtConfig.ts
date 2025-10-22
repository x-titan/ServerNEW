import type { StringValue } from "ms"

export interface IJWTPayload {
  id: number
  username: string
  iat?: number
  exp?: number
}

export interface IGenerateTokenOptions {
  expiresIn?: number | StringValue
  audience?: string
  issuer?: string
}
