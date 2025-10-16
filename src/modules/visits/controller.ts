import type { Middleware } from "../../core/types"
import httpError from "http-errors"
import * as visitsService from "./service"

export const index: Middleware = async (ctx) => {
  httpError.NotImplemented("Visits not implemented")
}
