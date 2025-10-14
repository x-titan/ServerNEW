import type { RouterContext, Middleware } from "@koa/router"
import * as urlsService from "./service"

export const createShortURL: Middleware = async (ctx: RouterContext) => {
  const { url, url_id } = ctx.request.body as any

  ctx.body = await urlsService.createShortURL(
    url,
    ctx.state.user_id,
    url_id
  )
}

export const resolveURL: Middleware = async (ctx: RouterContext) => {
  ctx.body = "Resolve URL with ID: " + ctx.query.id
}

export const updateURL: Middleware = async (ctx: RouterContext) => {
  const { url, url_id } = ctx.request.body as any

  ctx.body = await urlsService.updateURL(
    url_id,
    url,
    ctx.state.user_id
  )
}

export const deleteURL: Middleware = async (ctx: RouterContext) => {
  const { url_id } = ctx.request.body as any

  ctx.body = await urlsService.deleteURL(
    url_id,
    ctx.state.user_id
  )
}

export const getURLS: Middleware = async (ctx: RouterContext) => {
  const { limit = 10, offset = 0 } = ctx.request.body as any

  ctx.body = await urlsService.getURLS(
    ctx.state.user_id,
    limit,
    offset,
  )
}
