import type { KoaBodyMiddlewareOptions } from "koa-body"

const koaBodyConfig = {
  multipart: true,
  formidable: {
    uploadDir: "./temp",
    keepExtensions: true,
  },
} as KoaBodyMiddlewareOptions

export default koaBodyConfig
