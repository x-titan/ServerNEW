import type { RouterContext, Middleware } from "@koa/router"

export const index: Middleware = async (ctx: RouterContext) => {
  console.log("studio", ctx.URL.href)
  await ctx.render("studio", { title: "Studio" })
}
