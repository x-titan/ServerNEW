import * as healthService from "./service"
import type {
  IMiddleware,
} from "../../core/types"

export const check: IMiddleware = async (ctx) => {
  const success = await healthService.checkDatabaseConnection()
  const response = {
    success,
    data: `Servers database ${success ? "" : "not "}working`
  }

  ctx.body = response
}
