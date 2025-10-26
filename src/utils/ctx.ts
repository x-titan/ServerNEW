import type { Context } from "koa"

export function toJSON(ctx: Context) {
  return {
    status: ctx.status,
    url: ctx.url,
    method: ctx.method,
    headerSent: ctx.headerSent,
    writable: ctx.writable,
    respond: ctx.respond,
    bodyType: typeof ctx.body
  }
}

export function isResponded(ctx: Context) {
  return Boolean(
    ctx.headerSent ||
    ctx.writable ||
    (ctx.respond === false) ||
    ctx.body ||
    (ctx.status && ctx.status !== 404)
  )
}

export function isWritable(ctx: Context) {
  return Boolean(
    !ctx.headerSent &&
    ctx.writable &&
    (ctx.respond !== false) &&
    !ctx.body &&
    (!ctx.status || ctx.statust === 404)
  )
}
