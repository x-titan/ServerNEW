import httpError from "http-errors"
import * as visitsService from "./service"
import type { Middleware } from "../../core/types"

export const index: Middleware = async (ctx) => {
  httpError.NotImplemented("Visits not implemented")
}
