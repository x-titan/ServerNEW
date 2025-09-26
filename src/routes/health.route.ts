import Router from "@koa/router"

const healthRouter = new Router();

healthRouter
  .post("/", async (ctx) => {
    ctx.body = { status: "ok" }
  })
  .head("/", async (ctx) => {
    ctx.status = 200
  })

export default healthRouter
