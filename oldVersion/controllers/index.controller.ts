import type { Middleware, RouterContext } from "@koa/router"

export const index: Middleware = async (ctx: RouterContext) => {
  console.log("index")
  await ctx.render("index", { title: "Aset" })
}
