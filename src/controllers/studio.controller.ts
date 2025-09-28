import type { RouterContext } from "@koa/router"

export async function index(ctx: RouterContext) {
  await ctx.render("studio", { title: "Studio" })
}
