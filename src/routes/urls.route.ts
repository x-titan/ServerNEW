import Router from "@koa/router"
import { createShortURL, getURLS } from "../services/urls.service"

const urlsRouter = new Router()

urlsRouter
  .get("/", async (ctx) => {
    ctx.body = await getURLS(
      ctx.state.user_id,
      Number(ctx.query.limit) || 10,
      Number(ctx.query.offset) || 0,
    )
  })
  .post("/shorten", async (ctx) => {
    ctx.body = await createShortURL(
      ctx.request.body as any,
      ctx.state.user_id || undefined
    )
  })
  .post("/getAllurls", async (ctx) => {
    ctx.body = await getURLS(
      ctx.state.user_id,
      Number(ctx.query.limit) || 10,
      Number(ctx.query.offset) || 0,
    )
  })
  .put("/:id", async (ctx) => {
    ctx.body = `Update URL with ID: ${ctx.params.id}`
  })
  .delete("/:id", async (ctx) => {
    ctx.body = `Delete URL with ID: ${ctx.params.id}`
  })


export default urlsRouter