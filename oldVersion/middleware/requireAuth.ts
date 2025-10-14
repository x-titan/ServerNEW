import type { RouterContext } from "@koa/router"
import type { Next } from "koa"
import httpAssert from "http-assert"
import { validateJWT } from "../config/jwt"

function getAuthHeader(ctx: RouterContext) {
  const authHeader = ctx.get("authorization")
  httpAssert(authHeader, 401, "Please provide Authorization header")
  return authHeader
}

function verifyToken(authHeader: string) {
  const token = authHeader.split(" ")[1]
  httpAssert(token, 401, "Please provide token")

  const payload = validateJWT(token)
  httpAssert(payload, 401, "Invalid token")

  return payload
}

export default function requireAuth() {
  return async function (ctx: RouterContext, next: Next) {
    const authHeader = getAuthHeader(ctx)
    const payload = verifyToken(authHeader)
    ctx.state.user_id = payload.id

    await next()
  }
}
