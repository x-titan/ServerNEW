import type { Context, Next } from "koa"
import config from "../config/dotenv"

interface ErrorResponse {
  success: false
  message: string
  error?: string
  stack?: string
  path?: string
  timestamp?: string
}

export default function errorHandler(options?: any) {
  return async function (ctx: Context, next: Next) {
    try {
      await next()
    } catch (error: any) {
      const status = error.status || 500
      const response: ErrorResponse = {
        success: false,
        message: error.message || "Internal Server Error",
      }

      if (config.isDevelopment) {
        response.error = error.name
        response.stack = error.stack
        response.path = ctx.path
        response.timestamp = new Date().toISOString()
      }

      ctx.status = status
      ctx.body = response

      if (status >= 500) {
        console.error("[SERVER ERROR]", {
          status,
          message: error.message,
          stack: error.stack,
          method: ctx.method,
          url: ctx.url,
          ip: ctx.ip,
          userAgent: ctx.get("user-agent"),
          body: ctx.body,
          timestamp: new Date().toISOString(),
        })
      } else if (status >= 400 && config.isDevelopment) {
        console.warn("[CLIENT ERROR]", {
          status,
          message: error.message,
          method: ctx.method,
          url: ctx.url,
          ip: ctx.ip,
        })
      }

      ctx.app.emit("error", error, ctx)
    }
  }
}

export function logError(error: Error, ctx?: Context) {
  if (!error || error.message === "Not Found")
    return

  console.error("[APP ERROR]", {
    message: error.message,
    stack: error.stack,
    method: ctx?.method,
    url: ctx?.url,
    timestamp: new Date().toISOString(),
  })
}
