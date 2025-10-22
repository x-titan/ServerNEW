import type { Files } from "formidable"
import type * as Koa from "koa"

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body?: any
    files?: Files
  }
}
