import Router from "@koa/router"
import { login, register } from "../services/auth.service"

const authRouter = new Router()

authRouter
  .post("/login", async (ctx) => {
    ctx.body = await login(ctx.request.body as any)
  })
  .post("/register", async (ctx) => {
    ctx.body = await register(ctx.request.body as any)
  })

export default authRouter
