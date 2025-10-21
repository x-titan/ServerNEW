import Router from "@koa/router"
import {
  IContext,
  IState,
} from "../../core/types"
import * as testController from "./controller"

const testRouter = new Router<IState, IContext>()

testRouter
  .get("/", testController.getTestPage)
  .post("/", testController.postTest)

export default testRouter
