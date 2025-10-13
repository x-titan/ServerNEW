import Koa, { Context } from "koa"
import cors from "@koa/cors"
import helmet from "koa-helmet"
import bodyParser from "koa-bodyparser"
import router from "./routes/router"
import serve from "koa-static"
import logger from "koa-logger"
import path from "path"
import koaEjs from "koa-ejs"
import koaBody from "koa-body"

const app = new Koa()

const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://x-titan.github.io",
        "https://titanium-studio.github.io",
      ],
      imgSrc: [
        "'self'",
        "https://titanium-studio.github.io",
      ],
    },
  },
}

koaEjs(app, {
  root: path.join(__dirname, "/views"),
  layout: "layouts/index",
  viewExt: "ejs",
})

app
  .use(logger())
  .use(cors())
  .use(helmet(helmetOptions))
  .use(koaBody({
    multipart: true,
    formidable: {
      uploadDir: "./temp",
      keepExtensions: true,
    },
  }))
  // .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(
    path.join(__dirname, "../public")
  ))
  .use(async (ctx, next) => {
    ctx.status = 404
    console.log(ctx.request.URL)

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
