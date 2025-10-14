import type { Context, Next } from "koa"

export default async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch (error: any) {
    const status = error.status || 500
    ctx.status = status
    ctx.body = {
      success: false,
      message: error.message || "Internal Server Error"
    }

    if (status >= 500)
      console.error("[ERROR]", error)
  }
}
