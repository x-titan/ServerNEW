import Router from "@koa/router"
import type { Context, State } from "../core/types"
import assert from "assert"
import { isInstanceOf, isString } from "xtitan-typeis"

export default function useRouter(router: Router<State, Context>) {
  assert(
    isInstanceOf(router, Router<State, Context>),
    "router must be instance from @koa/router")

  return function (
    urlPath: string,
    subRouter: Router<State, Context>
  ) {
    assert(isString(urlPath), "urlPath must be a string")
    assert(
      isInstanceOf(subRouter, Router<State, Context>),
      "subrRouter must be instance from @koa/router")

    return router.use(
      urlPath,
      subRouter.routes()
    )
  }
}
