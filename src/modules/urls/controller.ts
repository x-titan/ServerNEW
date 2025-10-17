import * as urlsService from "./service"
import { validateURL, validateUrlId } from "./validate"
import httpAssert from "http-assert"
import { isString, isUInt } from "../../utils/types"
import type { AuthMiddleware } from "../../core/types"
import type { UrlBody } from "./types"

export const createShortURL: AuthMiddleware = async (ctx) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url, url_id } = body as UrlBody

  validateURL(url)
  validateUrlId(url_id)

  var result = await urlsService.createShortURL(
    url,
    ctx.state.user.id,
    url_id
  )

  ctx.status = 201
  ctx.body = {
    success: true,
    ...result,
    message: "short URL created successfully"
  }
}

export const resolveURL: AuthMiddleware = async (ctx) => {
  const { id } = ctx.params

  httpAssert(id, 400, "URL ID is required")
  httpAssert(isString(id), 400, "URL ID must be a string")

  const result = await urlsService.resolveURL(id)

  ctx.redirect(result)
}

export const updateURL: AuthMiddleware = async (ctx) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url, url_id } = body as UrlBody

  validateUrlId(url_id)
  validateURL(url)

  const result = await urlsService.updateURL(
    url_id,
    url,
    ctx.state.user.id
  )

  ctx.body = {
    success: true,
    ...result,
    message: "URL updated successfully"
  }
}

export const deleteURL: AuthMiddleware = async (ctx) => {
  const body = ctx.request.body
  httpAssert(body, 400, "Request body is required")

  const { url_id } = body as UrlBody

  validateUrlId(url_id)

  const result = await urlsService
    .deleteURL(url_id, ctx.state.user.id)

  ctx.body = {
    success: result,
    message: "URL deleted successfully"
  }
}

export const getUrlList: AuthMiddleware = async (ctx) => {
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
