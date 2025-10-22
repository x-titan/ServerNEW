import type {
  IMiddleware,
} from "../core/types"

export default function logger(): IMiddleware {
  return async function (ctx, next) {
    console.log("ctx:", ctx)
    await next()
  }
}
