import type { RouterContext } from "@koa/router"
import * as urlsService from "../services/urls.service"

export async function createShortURL(ctx: RouterContext) {
  const { url, url_id } = ctx.request.body as any

  ctx.body = await urlsService.createShortURL(
    url,
    ctx.state.user_id,
    url_id
  )
}

export async function resolveURL(ctx: RouterContext) {
  ctx.body = "Resolve URL with ID: " + ctx.query.id
}

export async function updateURL(ctx: RouterContext) {
  const { url, url_id } = ctx.request.body as any

  ctx.body = await urlsService.updateURL(
    url_id,
    url,
    ctx.state.user_id
  )
}

export async function deleteURL(ctx: RouterContext) {
  const { url_id } = ctx.request.body as any

  ctx.body = await urlsService.deleteURL(
    url_id,
    ctx.state.user_id
  )
}

export async function getURLS(ctx: RouterContext) {
  const { limit = 10, offset = 0 } = ctx.request.body as any

  ctx.body = await urlsService.getURLS(
    ctx.state.user_id,
    limit,
    offset,
  )
}
