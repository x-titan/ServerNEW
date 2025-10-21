import httpError from "http-errors"
import * as visitsService from "./service"
import type {
  IRouterMiddleware,
} from "../../core/types"

visitsService

export const index: IRouterMiddleware = async (ctx) => {
  httpError.NotImplemented("Visits not implemented")
}
