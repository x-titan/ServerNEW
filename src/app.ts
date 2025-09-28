import Koa, { Context } from "koa"
import cors from "@koa/cors"
import helmet from "koa-helmet"
import bodyParser from "koa-bodyparser"
import router from "./routes/router"
import serve from "koa-static"
import logger from "koa-logger"
import path from "path"
import koaEjs from "koa-ejs"

const app = new Koa()

koaEjs(app, {
  root: path.join(__dirname, "/views"),
  layout: "layouts/index",
  viewExt: "ejs",
})

app
  .use(logger())
  .use(cors())
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://x-titan.github.io"],
      },
    },
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(
    path.join(__dirname, "../public")
  ))
  .use(async (ctx, next) => {
    ctx.status = 404

    await ctx.render('404', {
      title: "Error: " + ctx.status,
      status: 404,
      message: 'Page is not found'
    })

    await next()
  })
  .on("error", async (error: Error, ctx: Context) => {
    console.error(error)

    if (!ctx.headerSent) {
      ctx.status = ctx.status || 500

      await ctx.render("error", {
        title: "Error: " + ctx.status,
        status: ctx.status,
        message: error.message || "Unexpected Server Error"
      })
    }
  })

export default app
