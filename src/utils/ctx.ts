import type { IContext } from "../core/types"

export function canSendResponse(ctx: IContext) {
  return Boolean(
    !ctx.headerSent
    && ctx.writable
    && (ctx.respond !== false)
    && !ctx.body
    && (!ctx.status || ctx.status === 404)
  )
}

// canSendResponse(ctx)  ===  !isResponded(ctx)

export function isReponded(ctx: IContext) {
  return Boolean(
    ctx.headerSent
    || !ctx.writable
    || (ctx.respond === false)
    || ctx.body
    || (ctx.status && ctx.status !== 404)
  )
}

export function getJSON(ctx: IContext) {
  return {
    status: ctx.status,
    url: ctx.url,
    method: ctx.method,
    body: ctx.body,
    state: ctx.state,
    headerSent: ctx.headerSent,
    writable: ctx.writable,
    respond: ctx.respond,
  }
}
