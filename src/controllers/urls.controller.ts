import type { RouterContext } from "@koa/router"
import * as urlsService from "../services/urls.service"

export async function createShortURL(ctx: RouterContext) {
  ctx.body = await urlsService.createShortURL(
    ctx.request.body as any,
    ctx.state.user_id || undefined
  )
}

export async function resolveURL(ctx: RouterContext) {
  ctx.body = "Resolve URL with ID: " + ctx.query.id
}

export async function updateURL(ctx: RouterContext) {
  ctx.body = await urlsService.updateURL(
    ctx.state.user_id,
    ctx.request.body as any,
    ctx.state.user_id
  )
}

export async function deleteURL(ctx: RouterContext) {
  ctx.body = await urlsService.deleteURL(
    ctx.request.body as any,
    ctx.state.user_id
  )
}

export async function getURLS(ctx: RouterContext) {
  ctx.body = await urlsService.getURLS(
    ctx.state.user_id,
    Number(ctx.query.limit) || 10,
    Number(ctx.query.offset) || 0,
  )
}

