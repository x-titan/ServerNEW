import httpAssert from "http-assert"

import {
  validateJWT,
} from "../config/jwt"
import type {
  IContext,
  IMiddleware,
} from "../core/types"
import type { Next } from "koa"

function verifyToken(authHeader: string) {
  const token = authHeader.split(" ")[1]
  httpAssert(token, 401, "Please provide token")

  const payload = validateJWT(token)
  httpAssert(payload, 401, "Invalid token")

  return payload
}

export default function requireAuth(): IMiddleware {
  return async function (ctx, next) {
    const authHeader = ctx.get("authorization")
    httpAssert(authHeader, 401, "Please provide Authorization header")

    const payload = verifyToken(authHeader)
    ctx.state.user = { id: payload.id }

    await next()
  }
}
