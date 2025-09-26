import type { RouterContext } from "@koa/router"
import type { Next } from "koa"
import httpAssert from "http-assert"
import { validateJWT } from "../config/jwt"

export default async function requireAuthHandler(ctx: RouterContext, next: Next) {
  const currend_user = ctx.request.headers.authorization

  httpAssert(currend_user, 401, "Please provide Authorization header")

  const token = currend_user?.split(" ")[1]
  const tokenPayload = validateJWT(token as string)

  httpAssert(tokenPayload, 401, "Invalid token")

  ctx.state.user_id = tokenPayload.id

  await next()
}
