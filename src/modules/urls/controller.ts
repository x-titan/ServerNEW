import type { RouterContext, Middleware } from "@koa/router"
import * as urlsService from "./service"
import { validateURL, validateUrlId } from "./validate"
import httpAssert from "http-assert"
import { isString, isUInt } from "../../utils/types"

export const createShortURL: Middleware = async (ctx: RouterContext) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url, url_id } = body as {
    url: string, url_id?: string
  }

  validateURL(url)
  validateUrlId(url_id)

  var result = await urlsService.createShortURL(
    url,
    ctx.state.user_id,
    url_id
  )

  ctx.status = 201
  ctx.body = {
    success: true,
    ...result,
    message: "short URL created successfully"
  }
}

export const resolveURL: Middleware = async (ctx: RouterContext) => {
  const { id } = ctx.params as { id: string }

  httpAssert(id, 400, "URL ID is required")
  httpAssert(isString(id), 400, "URL ID must be a string")

  const result = await urlsService.resolveURL(id)

  ctx.redirect(result)
}

export const updateURL: Middleware = async (ctx: RouterContext) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url, url_id } = body as {
    url_id: string, url: string
  }

  validateUrlId(url_id)
  validateURL(url)

  const result = await urlsService.updateURL(
    url_id,
    url,
    ctx.state.user_id
  )

  ctx.body = {
    success: true,
    ...result,
    message: "URL updated successfully"
  }
}

export const deleteURL: Middleware = async (ctx: RouterContext) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url_id } = body as { url_id: string }

  validateUrlId(url_id)

  const result = await urlsService.deleteURL(url_id, ctx.state.user_id)

  ctx.body = {
    success: true,
    message: "URL deleted successfully"
  }
}

export const getURLS: Middleware = async (ctx: RouterContext) => {

  const limit = parseInt(ctx.query.limit as string) || 10
  const offset = parseInt(ctx.query.offset as string) || 0

  httpAssert(
    limit > 0 && limit <= 50,
    400, "Limit must be a between 1 and 50"
  )
  httpAssert(
    isUInt(offset),
    400, "Offset must be anon-negative"
  )

  const result = await urlsService.getURLS(
    ctx.state.user_id,
    limit,
    offset,
  )

  ctx.body = {
    success: true,
    ...result
  }
}
