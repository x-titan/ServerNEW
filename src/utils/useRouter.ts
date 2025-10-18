import Router from "@koa/router"
import type { IContext, IState } from "../core/types"
import assert from "assert"
import { isInstanceOf, isString } from "xtitan-typeis"

export default function useRouter(router: Router<IState, IContext>) {
  assert(
    isInstanceOf(router, Router<IState, IContext>),
    "router must be instance from @koa/router")

  return function (
    urlPath: string,
    subRouter: Router<IState, IContext>
  ) {
    assert(isString(urlPath), "urlPath must be a string")
    assert(
      isInstanceOf(subRouter, Router<IState, IContext>),
      "subrRouter must be instance from @koa/router")

    return router.use(
      urlPath,
      subRouter.routes()
    )
  }
}
