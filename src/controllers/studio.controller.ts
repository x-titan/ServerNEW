import type { RouterContext, Middleware } from "@koa/router"

export const index: Middleware = async (ctx: RouterContext) => {
  await ctx.render("studio", { title: "Studio" })
}
