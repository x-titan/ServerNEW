import type { RouterContext, Middleware } from "@koa/router"
import httpError from "http-errors"
import * as visitsService from "./service"

export const index: Middleware = async (ctx: RouterContext) => {
  httpError.NotImplemented("Visits not implemented")
}
