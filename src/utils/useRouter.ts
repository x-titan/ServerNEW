import assert from "assert"
import Router from "@koa/router"
import type {
  IContext,
  IState,
} from "../core/types"
import {
  isString,
} from "./types"

export default function useRouter(router: Router<IState, IContext>) {
  assert(
    router instanceof Router,
    "router must be instance from @koa/router")

  return function (
    urlPath: string,
    subRouter: Router<IState, IContext>
  ) {
    assert(isString(urlPath), "urlPath must be a string")
    assert(
      router instanceof Router,
      "subRouter must be instance from @koa/router")

    return router.use(
      urlPath,
      subRouter.routes()
    )
  }
}
