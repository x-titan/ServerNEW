import type { Options } from "@koa/cors"

const corsOptions: Options = {
  origin: "*",
  credentials: true,
}

export default corsOptions
