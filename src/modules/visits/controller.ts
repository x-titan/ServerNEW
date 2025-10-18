import httpError from "http-errors"
import * as visitsService from "./service"
import type { IMiddleware } from "../../core/types"

export const index: IMiddleware = async (ctx) => {
  httpError.NotImplemented("Visits not implemented")
}
