import Router from "@koa/router"
import type { Middleware } from "@koa/router"
import assert from "assert"
import { is, isInstanceOf } from "xtitan-typeis"

export default function useRouter(router: Router) {
  assert(
    isInstanceOf(router, Router),
    "router must be instance from @koa/router")

  return function (
    urlPath: string,
    subRouter: Router,
    middleware?: Middleware[]
  ) {
    assert(is.str(urlPath), "urlPath must be a string")
    assert(
      isInstanceOf(subRouter, Router),
      "subrRouter must be instance from @koa/router")

    if (!is.arr(middleware))
      middleware = []

    return router.use(
      urlPath,
      ...middleware,
      subRouter.routes() as unknown as Middleware,
      subRouter.allowedMethods() as unknown as Middleware
    )
  }
}
