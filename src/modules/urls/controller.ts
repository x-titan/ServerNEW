import httpAssert from "http-assert"

import * as urlsService from "./service"
import { validateURL, validateUrlId } from "./validate"

import {
  isString,
  isUInt,
  safeObject,
} from "../../utils"

import type {
  IAuthMiddleware,
  IJSONResponse,
  IRouterMiddleware,

} from "../../core/types"
import type {
  IUrlListResponse,
  IUrlRequest,
  IUrlResponse,
} from "./model"

export const createShortURL: (IAuthMiddleware) = async (ctx) => {
  const body = safeObject(ctx.request.body as IUrlRequest)
  httpAssert(body, 400, "Request body is required")
  ctx.params 
  const { url, url_id } = body
  validateURL(url)
  validateUrlId(url_id)

  const result = await urlsService.createShortURL(
    url,
    ctx.state.user.id,
    url_id
  )

  ctx.status = 201
  ctx.body = {
    success: true,
    data: result,
    message: "short URL created successfully"
  } as IUrlResponse
}

export const resolveURL: IAuthMiddleware = async (ctx) => {
  const { id } = ctx.params
  httpAssert(id, 400, "URL ID is required")
  httpAssert(isString(id), 400, "URL ID must be a string")

  const result = await urlsService.resolveURL(id)
  ctx.redirect(result)
}

export const updateURL: IAuthMiddleware = async (ctx) => {
  const body = safeObject(ctx.request.body)
  httpAssert(body, 400, "Request body is required")

  const { url, url_id } = body as IUrlRequest
  validateUrlId(url_id)
  validateURL(url)

  const result = await urlsService.updateURL(
    url_id,
    url,
    ctx.state.user.id
  )

  ctx.body = {
    success: true,
    data: result,
    message: "URL updated successfully"
  } as IUrlResponse
}

export const deleteURL: IAuthMiddleware = async (ctx) => {
  const body = safeObject(ctx.request.body)
  httpAssert(body, 400, "Request body is required")

  const { url_id } = body as IUrlRequest
  validateUrlId(url_id)

  const result = await urlsService
    .deleteURL(url_id, ctx.state.user.id)

  ctx.body = {
    success: result,
    message: (result
      ? "URL deleted successfully"
      : "URL not found"),
  } as IJSONResponse
}

export const getURLs: IAuthMiddleware = async (ctx) => {
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

  const result = await urlsService.getURLs(
    ctx.state.user.id,
    limit,
    offset,
  )

  ctx.body = {
    success: true,
    data: result,
    message: "URLs retrieved successfully"
  } as IUrlListResponse
}
