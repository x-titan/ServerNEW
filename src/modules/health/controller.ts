import * as healthService from "./service"
import type {
  IRouterMiddleware,
} from "../../core/types"

export const check: IRouterMiddleware = async (ctx) => {
  const success = await healthService.checkDatabaseConnection()
  const response = {
    success,
    data: `Servers database ${success ? "" : "not "}working`
  }

  ctx.body = response
}
